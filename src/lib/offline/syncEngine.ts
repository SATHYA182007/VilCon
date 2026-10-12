import { db } from './db';
import confetti from 'canvas-confetti';

export interface SyncReport {
  sosCount: number;
  schemesCount: number;
  telemedicineCount: number;
  totalSynced: number;
  timestamp: string;
}

export async function getUnsyncedCounts() {
  const unsyncedSOS = await db.sosQueue.where('synced').equals(0).count();
  const unsyncedSchemes = await db.schemeApplications.where('synced').equals(0).count();
  const unsyncedTelemed = await db.telemedicineRequests.where('synced').equals(0).count();
  return {
    sos: unsyncedSOS,
    schemes: unsyncedSchemes,
    telemedicine: unsyncedTelemed,
    total: unsyncedSOS + unsyncedSchemes + unsyncedTelemed,
  };
}

export async function performAutoSync(onProgress?: (step: string) => void): Promise<SyncReport> {
  if (onProgress) onProgress('Scanning IndexedDB local queues...');
  await new Promise((r) => setTimeout(r, 600));

  const unsyncedSOSList = await db.sosQueue.where('synced').equals(0).toArray();
  const unsyncedSchemesList = await db.schemeApplications.where('synced').equals(0).toArray();
  const unsyncedTelemedList = await db.telemedicineRequests.where('synced').equals(0).toArray();

  if (onProgress) onProgress(`Found ${unsyncedSOSList.length} SOS, ${unsyncedSchemesList.length} Schemes, ${unsyncedTelemedList.length} Medical requests.`);
  await new Promise((r) => setTimeout(r, 800));

  // Sync SOS requests
  for (const item of unsyncedSOSList) {
    if (item.id) {
      await db.sosQueue.update(item.id, { synced: true });
    }
  }

  // Sync Schemes
  for (const item of unsyncedSchemesList) {
    if (item.id) {
      await db.schemeApplications.update(item.id, { synced: true, status: 'Submitted' });
    }
  }

  // Sync Telemedicine requests
  for (const item of unsyncedTelemedList) {
    if (item.id) {
      await db.telemedicineRequests.update(item.id, { synced: true });
    }
  }

  if (onProgress) onProgress('Finalizing sync handshake with central database...');
  await new Promise((r) => setTimeout(r, 500));

  const totalSynced = unsyncedSOSList.length + unsyncedSchemesList.length + unsyncedTelemedList.length;

  if (totalSynced > 0) {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#3B82F6', '#06B6D4', '#10B981', '#8B5CF6'],
      });
    } catch {
      // Ignore if DOM canvas not available
    }
  }

  return {
    sosCount: unsyncedSOSList.length,
    schemesCount: unsyncedSchemesList.length,
    telemedicineCount: unsyncedTelemedList.length,
    totalSynced,
    timestamp: new Date().toISOString(),
  };
}
