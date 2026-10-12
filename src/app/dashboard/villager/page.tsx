'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Stethoscope,
  BookOpen,
  Building2,
  CloudDownload,
  Wifi,
  WifiOff,
  Radio,
  Clock,
  Sparkles,
  CloudSun,
  Shield,
  CheckCircle2,
  PhoneCall,
  Plus,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { VillageMap } from '@/components/map/VillageMap';
import { useApp } from '@/lib/context/AppContext';
import { db, OfflineResource } from '@/lib/offline/db';

export default function VillagerDashboard() {
  const { networkMode, unsyncedCount, refreshUnsyncedCount, addNotification, userName, villageName } = useApp();
  const [sosSent, setSosSent] = useState(false);
  const [offlineResources, setOfflineResources] = useState<OfflineResource[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'downloads' | 'queue'>('overview');

  const isOffline = networkMode === 'Offline';

  useEffect(() => {
    db.offlineResources.toArray().then((items) => setOfflineResources(items));
  }, []);

  const triggerSOSPanic = async () => {
    setSosSent(true);
    const uuid = `sos-${Date.now()}`;
    await db.sosQueue.add({
      uuid,
      timestamp: new Date().toISOString(),
      villagerName: userName,
      phone: '+91 98765 43210',
      villageName: villageName,
      coordinates: { lat: 25.5941, lng: 85.1376 },
      emergencyType: 'medical',
      severity: 'Critical',
      description: 'Emergency SOS triggered via Villager Panic Button.',
      synced: !isOffline,
    });

    await refreshUnsyncedCount();

    addNotification({
      title: '🚨 Emergency SOS Dispatched',
      message: isOffline
        ? 'SOS queued in IndexedDB local vault. Broadcasting over short-range Mesh Relay Node #14.'
        : 'SOS sent live to District Hospital & Emergency Response Team.',
      type: 'emergency',
    });

    setTimeout(() => setSosSent(false), 3000);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-electric-950/80 via-dark-900 to-cyan-950/80 border border-electric-500/30 backdrop-blur-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-electric-500/20 text-electric-300 border border-electric-500/30 font-semibold">
              Villager Portal
            </span>
            <span className="text-xs text-gray-400">ID: VC-BHJ-9941</span>
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            Welcome back, {userName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            📍 Location: <span className="text-cyan-300 font-semibold">{villageName}</span> • Connectivity Node: <span className="text-emerald-400 font-semibold">Mesh Relay #14</span>
          </p>
        </div>

        {/* SOS Panic Trigger Button */}
        <button
          onClick={triggerSOSPanic}
          disabled={sosSent}
          className={`px-6 py-4 rounded-2xl font-poppins font-extrabold text-base shadow-2xl transition-all flex items-center justify-center gap-3 ${
            sosSent
              ? 'bg-emerald-600 text-white animate-pulse'
              : 'bg-gradient-to-r from-rose-600 via-red-500 to-amber-600 text-white hover:scale-105 shadow-rose-600/50'
          }`}
        >
          <AlertTriangle className="w-6 h-6 animate-bounce" />
          <span>{sosSent ? 'SOS DISPATCHED!' : 'EMERGENCY SOS PANIC'}</span>
        </button>
      </div>

      {/* Connectivity Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard glowColor={isOffline ? 'violet' : 'emerald'} className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Signal Status</span>
            {isOffline ? <WifiOff className="w-4 h-4 text-rose-400" /> : <Wifi className="w-4 h-4 text-emerald-400" />}
          </div>
          <p className={`font-poppins font-bold text-lg ${isOffline ? 'text-rose-400' : 'text-emerald-400'}`}>
            {networkMode}
          </p>
          <p className="text-[11px] text-gray-400">
            {isOffline ? 'Offline Mode Active • Saved to IndexedDB' : '5G Satellite Uplink • 99.4% Bandwidth'}
          </p>
        </GlassCard>

        <GlassCard glowColor="cyan" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Pending Sync Queue</span>
            <Radio className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="font-poppins font-bold text-xl text-cyan-300">{unsyncedCount} Items</p>
          <p className="text-[11px] text-gray-400">Auto-flushes on signal restore</p>
        </GlassCard>

        <GlassCard glowColor="blue" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Local Weather</span>
            <CloudSun className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-poppins font-bold text-xl text-white">28°C • Light Rain</p>
          <p className="text-[11px] text-amber-400 font-semibold">Rain warning at 17:00 HRS</p>
        </GlassCard>

        <GlassCard glowColor="violet" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Health Doctor Queue</span>
            <Stethoscope className="w-4 h-4 text-violet-400" />
          </div>
          <p className="font-poppins font-bold text-xl text-violet-300">Dr. Ananya Sharma</p>
          <p className="text-[11px] text-gray-400">PHC Bhojpur • 2 Patients Ahead</p>
        </GlassCard>
      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/telemedicine" className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex flex-col items-center text-center space-y-2 group">
          <Stethoscope className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="font-poppins font-bold text-white text-sm">Book Telemedicine</span>
          <span className="text-[11px] text-emerald-300">Video & Offline Consult</span>
        </Link>

        <Link href="/education" className="p-4 rounded-2xl bg-electric-500/10 border border-electric-500/30 hover:bg-electric-500/20 transition-all flex flex-col items-center text-center space-y-2 group">
          <BookOpen className="w-8 h-8 text-electric-400 group-hover:scale-110 transition-transform" />
          <span className="font-poppins font-bold text-white text-sm">Digital Academy</span>
          <span className="text-[11px] text-electric-300">Courses & PDF Books</span>
        </Link>

        <Link href="/schemes" className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all flex flex-col items-center text-center space-y-2 group">
          <Building2 className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="font-poppins font-bold text-white text-sm">PM Scheme Checker</span>
          <span className="text-[11px] text-amber-300">GramAI Eligibility Engine</span>
        </Link>

        <a href="#downloads" onClick={() => setActiveTab('downloads')} className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex flex-col items-center text-center space-y-2 group">
          <CloudDownload className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="font-poppins font-bold text-white text-sm">Offline Downloads</span>
          <span className="text-[11px] text-cyan-300">{offlineResources.length} Cached Materials</span>
        </a>
      </div>

      {/* MAIN CONTENT TABS & MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Map & Notices */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-lg text-white">Village Services Map</h3>
            <VillageMap heightClassName="h-[400px]" />
          </div>

          {/* Local Ag & Weather Advice Card */}
          <GlassCard glowColor="cyan" className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>GramAI Agricultural & Weather Tip of the Day</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              🌧️ With moderate evening rainfall forecasted, complete harvesting pulse crops before 16:00 HRS. Keep grain stores elevated off ground level to prevent moisture dampness.
            </p>
          </GlassCard>
        </div>

        {/* Right Column: Offline Resources & Notices */}
        <div className="space-y-6" id="downloads">
          <GlassCard glowColor="violet" className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-poppins font-bold text-white text-base">Offline Vault</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                PWA IndexedDB
              </span>
            </div>

            <div className="space-y-3">
              {offlineResources.map((res) => (
                <div key={res.id} className="p-3 rounded-xl bg-dark-800 border border-white/10 space-y-1 hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white truncate max-w-[180px]">{res.title}</span>
                    <span className="text-[10px] uppercase font-bold text-cyan-400">{res.fileType} • {res.sizeMB}MB</span>
                  </div>
                  <p className="text-[11px] text-gray-400 line-clamp-2">{res.contentSnippet}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Community Noticeboard */}
          <GlassCard className="space-y-3">
            <h3 className="font-poppins font-bold text-white text-base">Village Announcements</h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-dark-800 border-l-2 border-amber-400 space-y-1">
                <p className="font-bold text-amber-300">Free Vaccination Camp</p>
                <p className="text-gray-400">At Primary School Bhojpur on Saturday, 09:00 AM.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-dark-800 border-l-2 border-electric-400 space-y-1">
                <p className="font-bold text-electric-300">Kisan Credit Card Drive</p>
                <p className="text-gray-400">Government Officers visiting Panchayat Bhavan tomorrow.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
