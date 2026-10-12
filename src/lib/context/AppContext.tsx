'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUnsyncedCounts, performAutoSync, SyncReport } from '../offline/syncEngine';
import { seedOfflineResourcesIfEmpty } from '../offline/db';

export type UserRole = 'villager' | 'healthcare' | 'government' | 'network_admin' | 'emergency';
export type NetworkMode = 'Online' | '2G / Low-Bandwidth' | 'Local Mesh Relay' | 'Offline';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'emergency';
  timestamp: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (r: UserRole) => void;
  networkMode: NetworkMode;
  setNetworkMode: (m: NetworkMode) => void;
  unsyncedCount: number;
  refreshUnsyncedCount: () => Promise<void>;
  notifications: NotificationItem[];
  addNotification: (n: Omit<NotificationItem, 'id' | 'timestamp'>) => void;
  dismissNotification: (id: string) => void;
  isSyncing: boolean;
  syncStepText: string;
  triggerSync: () => Promise<SyncReport | null>;
  copilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
  userName: string;
  villageName: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('villager');
  const [networkMode, setNetworkMode] = useState<NetworkMode>('Online');
  const [unsyncedCount, setUnsyncedCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStepText, setSyncStepText] = useState<string>('');
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [userName] = useState<string>('Ramesh Kumar');
  const [villageName] = useState<string>('Bhojpur Village, Bihar');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Satellite Link Active',
      message: 'VillageConnect AI hybrid relay node #14 online with 99.4% uptime.',
      type: 'info',
      timestamp: 'Just now',
    },
    {
      id: 'notif-2',
      title: 'Weather Warning',
      message: 'Localized heavy rainfall alert for Bhojpur district at 17:00 HRS.',
      type: 'warning',
      timestamp: '10m ago',
    },
  ]);

  const refreshUnsyncedCount = async () => {
    try {
      const counts = await getUnsyncedCounts();
      setUnsyncedCount(counts.total);
    } catch {
      // IndexedDB fallback
    }
  };

  useEffect(() => {
    seedOfflineResourcesIfEmpty();
    refreshUnsyncedCount();
  }, []);

  // When switching from Offline -> Online/2G, prompt auto sync
  const handleNetworkModeChange = (newMode: NetworkMode) => {
    setNetworkMode(newMode);
    if (newMode === 'Online' && unsyncedCount > 0) {
      addNotification({
        title: 'Connection Restored',
        message: `Network signal re-established. ${unsyncedCount} pending requests ready for synchronization.`,
        type: 'success',
      });
    } else if (newMode === 'Offline') {
      addNotification({
        title: 'Offline Mode Active',
        message: 'Switched to offline IndexedDB storage. You can continue submitting requests safely.',
        type: 'warning',
      });
    }
  };

  const addNotification = (n: Omit<NotificationItem, 'id' | 'timestamp'>) => {
    const item: NotificationItem = {
      ...n,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications((prev) => [item, ...prev]);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const triggerSync = async (): Promise<SyncReport | null> => {
    setIsSyncing(true);
    setSyncStepText('Initiating handshake...');
    try {
      const report = await performAutoSync((step) => setSyncStepText(step));
      await refreshUnsyncedCount();
      setIsSyncing(false);
      setSyncStepText('');

      if (report.totalSynced > 0) {
        addNotification({
          title: 'Synchronization Complete',
          message: `Successfully synchronized ${report.totalSynced} pending requests to VillageConnect Cloud.`,
          type: 'success',
        });
      } else {
        addNotification({
          title: 'Database Synchronized',
          message: 'All local records are up to date.',
          type: 'info',
        });
      }
      return report;
    } catch (e) {
      console.error(e);
      setIsSyncing(false);
      setSyncStepText('');
      return null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        networkMode,
        setNetworkMode: handleNetworkModeChange,
        unsyncedCount,
        refreshUnsyncedCount,
        notifications,
        addNotification,
        dismissNotification,
        isSyncing,
        syncStepText,
        triggerSync,
        copilotOpen,
        setCopilotOpen,
        userName,
        villageName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
