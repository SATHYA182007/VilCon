'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Radio,
  Wifi,
  WifiOff,
  Zap,
  Activity,
  AlertTriangle,
  Sparkles,
  Server,
  RefreshCw,
  Cpu,
  Sliders,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { VillageMap } from '@/components/map/VillageMap';
import { useApp } from '@/lib/context/AppContext';

export default function NetworkAdminDashboard() {
  const { addNotification } = useApp();
  const [optimizing, setOptimizing] = useState(false);

  const towers = [
    { id: 'TWR-ALPHA-01', name: 'Bhojpur Central Gateway', type: '5G Satellite Uplink', status: 'Online', battery: 94, bandwidth: '150 Mbps', packetLoss: '0.02%', health: 98 },
    { id: 'TWR-BETA-04', name: 'Rampur Solar Relay Tower', type: 'LoRa Mesh Relay', status: 'Degraded', battery: 28, bandwidth: '12 Mbps', packetLoss: '4.8%', health: 64 },
    { id: 'TWR-GAMMA-09', name: 'Sunderpur South Station', type: 'Micro-Tower Relay', status: 'Offline', battery: 0, bandwidth: '0 Mbps', packetLoss: '100%', health: 0 },
    { id: 'TWR-DELTA-12', name: 'Devgarh Hill Transceiver', type: 'Solar Mesh Node', status: 'Relay Active', battery: 78, bandwidth: '45 Mbps', packetLoss: '0.8%', health: 89 },
  ];

  const outagePredictions = [
    {
      towerId: 'TWR-BETA-04',
      predictedTime: 'In 5.5 Hours (16:30 HRS)',
      reason: 'Monsoon Heavy Rainfall + Solar Battery Depletion below 15%',
      riskLevel: 'HIGH OUTAGE RISK',
      recommendedAction: 'Reroute traffic to Devgarh Hill Relay Node #12',
    },
    {
      towerId: 'TWR-GAMMA-09',
      predictedTime: 'Current Active Blackout',
      reason: 'Physical Fiber Break detected at Grid Marker #88',
      riskLevel: 'ACTIVE BLACKOUT',
      recommendedAction: 'Deploy Portable Emergency Satellite Terminal',
    },
  ];

  const handleRunAIOptimizer = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      addNotification({
        title: 'AI Mesh Network Re-Balanced',
        message: 'GramAI predictive router shifted 320kbps traffic from Rampur to Devgarh Hill Relay.',
        type: 'success',
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-violet-950/80 via-dark-900 to-cyan-950/80 border border-violet-500/30 backdrop-blur-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold flex items-center gap-1">
              <Radio className="w-3.5 h-3.5" /> Network Administrator Portal
            </span>
            <span className="text-xs text-gray-400">Bhojpur Regional Mesh NOC</span>
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            Tower Infrastructure & AI Outage Prediction
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Monitor satellite relays, solar node battery reserves, and predictive traffic routing
          </p>
        </div>

        <button
          onClick={handleRunAIOptimizer}
          disabled={optimizing}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-cyan-500 to-electric-600 text-white font-poppins font-bold text-sm shadow-xl shadow-violet-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles className={`w-5 h-5 ${optimizing ? 'animate-spin' : ''}`} />
          <span>{optimizing ? 'Optimizing Mesh...' : 'Run GramAI Router Optimizer'}</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard glowColor="violet" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Total Cellular & Relay Nodes</span>
            <Server className="w-4 h-4 text-violet-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-violet-300">18 Active Nodes</p>
          <p className="text-[11px] text-gray-400">14 Solar-Powered • 4 Grid</p>
        </GlassCard>

        <GlassCard glowColor="cyan" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Mesh Packet Delivery</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-cyan-300">99.1% Success Rate</p>
          <p className="text-[11px] text-gray-400">Avg delay 42ms</p>
        </GlassCard>

        <GlassCard glowColor="emerald" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Total Bandwidth Pool</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-emerald-300">450 Mbps</p>
          <p className="text-[11px] text-gray-400">Satellite downlink link active</p>
        </GlassCard>

        <GlassCard glowColor="none" className="space-y-2 border-amber-500/30 bg-amber-500/10">
          <div className="flex items-center justify-between text-xs text-amber-300">
            <span>AI Predicted Outages</span>
            <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <p className="font-poppins font-bold text-2xl text-amber-300">1 Warning</p>
          <p className="text-[11px] text-amber-300">Rampur node low battery</p>
        </GlassCard>
      </div>

      {/* AI PREDICTIVE OUTAGE MODULE */}
      <GlassCard glowColor="violet" className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin-slow" />
            <h3 className="font-poppins font-bold text-white text-lg">AI Outage Prediction Radar</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-semibold border border-violet-500/30">
            Predictive Telemetry Model v2.4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outagePredictions.map((pred, i) => (
            <div key={i} className="p-4 rounded-xl bg-dark-800 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-cyan-400">{pred.towerId}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    pred.riskLevel.includes('ACTIVE')
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {pred.riskLevel}
                </span>
              </div>
              <p className="font-poppins font-bold text-sm text-white">{pred.predictedTime}</p>
              <p className="text-xs text-gray-300">{pred.reason}</p>
              <div className="p-2.5 rounded-lg bg-electric-500/10 border border-electric-500/20 text-xs text-electric-300 font-medium">
                💡 <span className="font-bold">Recommended Action:</span> {pred.recommendedAction}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* TOWER STATUS TABLE */}
      <GlassCard glowColor="cyan" className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-poppins font-bold text-white text-lg">Cellular & Relay Node Topology</h3>
          <button className="px-3 py-1 rounded-lg bg-dark-800 border border-white/10 text-xs text-gray-300 hover:text-white flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Telemetry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-dark-800/80 uppercase text-[10px] text-gray-400 font-semibold">
              <tr>
                <th className="p-3">Node ID</th>
                <th className="p-3">Tower Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Battery Reserve</th>
                <th className="p-3">Bandwidth</th>
                <th className="p-3 text-right">Packet Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {towers.map((tower) => (
                <tr key={tower.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-mono font-bold text-cyan-400">{tower.id}</td>
                  <td className="p-3 font-bold text-white">{tower.name}</td>
                  <td className="p-3 text-gray-400">{tower.type}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        tower.status === 'Online'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : tower.status === 'Degraded'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : tower.status === 'Relay Active'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                      }`}
                    >
                      {tower.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">
                    <span className={tower.battery < 30 ? 'text-amber-400' : 'text-emerald-400'}>
                      ⚡ {tower.battery}%
                    </span>
                  </td>
                  <td className="p-3 font-mono">{tower.bandwidth}</td>
                  <td className="p-3 text-right font-mono text-gray-400">{tower.packetLoss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* MAP */}
      <div className="space-y-3">
        <h3 className="font-poppins font-bold text-white text-lg">Network Relay & Signal Topology Map</h3>
        <VillageMap heightClassName="h-[420px]" />
      </div>
    </div>
  );
}
