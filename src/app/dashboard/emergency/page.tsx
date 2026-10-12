'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  AlertTriangle,
  MapPin,
  Ambulance,
  Phone,
  CheckCircle2,
  Clock,
  Navigation,
  Send,
  Radio,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { VillageMap } from '@/components/map/VillageMap';
import { useApp } from '@/lib/context/AppContext';

export default function EmergencyDashboard() {
  const { addNotification } = useApp();
  const [selectedIncident, setSelectedIncident] = useState<number>(0);
  const [dispatched, setDispatched] = useState<Record<number, boolean>>({});

  const incidents = [
    {
      id: 101,
      name: 'Ramesh Kumar',
      village: 'Sunderpur Cluster (Sector B)',
      coordinates: '25.582° N, 85.118° E',
      type: 'Snakebite Trauma',
      severity: 'Critical',
      time: '3 mins ago',
      mode: 'Mesh Relay Broadcast (Offline Queue)',
      nearestFacility: 'Bhojpur District Hospital (4.2 km)',
      description: 'Villager bitten by venomous krait snake. Severe swelling, difficulty breathing. Requires anti-venom injection immediately.',
      phone: '+91 98765 43210',
    },
    {
      id: 102,
      name: 'Anita Devi',
      village: 'Rampur North',
      coordinates: '25.612° N, 85.155° E',
      type: 'Obstetric Emergency (Labor)',
      severity: 'High',
      time: '18 mins ago',
      mode: 'Satellite 5G Uplink',
      nearestFacility: 'PHC Bhojpur Sub-Center (1.8 km)',
      description: 'Pre-term labor contractions. Patient requiring emergency transport vehicle.',
      phone: '+91 98123 77654',
    },
    {
      id: 103,
      name: 'Prakash Roy',
      village: 'Devgarh Hill Road',
      coordinates: '25.625° N, 85.122° E',
      type: 'Tractor Collision Accident',
      severity: 'High',
      time: '45 mins ago',
      mode: 'Local Mesh Relay Node #12',
      nearestFacility: 'Bhojpur District Hospital (6.5 km)',
      description: 'Multiple contusions, suspected arm fracture. First responder on site.',
      phone: '+91 94321 00987',
    },
  ];

  const active = incidents[selectedIncident];

  const dispatchAmbulance = (id: number) => {
    setDispatched((prev) => ({ ...prev, [id]: true }));
    addNotification({
      title: '🚨 Emergency Ambulance Dispatched',
      message: `Emergency response unit #4 assigned to incident #${id} (${active.name}). En route via GPS telemetry.`,
      type: 'emergency',
    });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-rose-950/90 via-dark-900 to-amber-950/80 border border-rose-500/40 backdrop-blur-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" /> Emergency SOS Dispatch Center
            </span>
            <span className="text-xs text-gray-400">District 108 Command Center</span>
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            Live Rural SOS Emergency Response
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Real-time GPS incident tracking • Mesh relay panic alerts • Ambulance routing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center gap-2 animate-pulse">
            <Radio className="w-4 h-4" /> 1 Active Critical SOS
          </span>
        </div>
      </div>

      {/* Stats KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard glowColor="none" className="space-y-2 border-rose-500/40 bg-rose-500/10">
          <div className="flex items-center justify-between text-xs text-rose-300">
            <span>Critical Incidents</span>
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <p className="font-poppins font-bold text-2xl text-rose-400">1 Critical</p>
          <p className="text-[11px] text-rose-300">Snakebite Trauma in Sunderpur</p>
        </GlassCard>

        <GlassCard glowColor="cyan" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Avg Response Time</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-cyan-300">4.8 Minutes</p>
          <p className="text-[11px] text-emerald-400">65% faster via mesh relay</p>
        </GlassCard>

        <GlassCard glowColor="emerald" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Active Ambulances</span>
            <Ambulance className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-emerald-300">6 Units Ready</p>
          <p className="text-[11px] text-gray-400">2 En Route to targets</p>
        </GlassCard>

        <GlassCard glowColor="violet" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Mesh Broadcast Relays</span>
            <Radio className="w-4 h-4 text-violet-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-violet-300">100% Signal Coverage</p>
          <p className="text-[11px] text-gray-400">LoRa Radio Backup active</p>
        </GlassCard>
      </div>

      {/* INCIDENT WORKSPACE & MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Incident Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-white text-base">Live SOS Incident Stream</h3>
            <span className="text-xs text-rose-400 font-semibold">Real-Time Pings</span>
          </div>

          <div className="space-y-3">
            {incidents.map((incident, index) => (
              <div
                key={incident.id}
                onClick={() => setSelectedIncident(index)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedIncident === index
                    ? 'bg-rose-500/10 border-rose-500 shadow-lg shadow-rose-500/20'
                    : 'bg-dark-900 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs text-rose-400">SOS #{incident.id}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      incident.severity === 'Critical'
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {incident.severity}
                  </span>
                </div>
                <h4 className="font-poppins font-bold text-white text-sm">{incident.name}</h4>
                <p className="text-xs text-gray-300 mt-1">{incident.type}</p>
                <p className="text-[11px] text-gray-400">{incident.village}</p>
                <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 mt-2 border-t border-white/5">
                  <span>{incident.mode}</span>
                  <span>{incident.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center/Right Workspace: Incident Inspector & Live GPS Map */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard glowColor="none" className="border-rose-500/40 bg-dark-900/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-poppins font-bold text-xl text-white">{active.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                    {active.severity} SOS
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1">📍 {active.village} • Coordinates: <span className="font-mono text-cyan-300">{active.coordinates}</span></p>
              </div>

              <button
                onClick={() => dispatchAmbulance(active.id)}
                disabled={dispatched[active.id]}
                className={`px-6 py-3 rounded-xl font-poppins font-bold text-xs transition-all flex items-center gap-2 ${
                  dispatched[active.id]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-rose-600 via-red-500 to-amber-600 text-white shadow-lg shadow-rose-600/30 hover:scale-105'
                }`}
              >
                <Ambulance className="w-4 h-4" />
                <span>{dispatched[active.id] ? 'AMBULANCE EN ROUTE' : 'DISPATCH AMBULANCE UNIT'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-dark-800 border border-white/10 space-y-2">
                <span className="text-[11px] text-gray-400 uppercase font-semibold">Incident Details</span>
                <p className="font-bold text-sm text-white">{active.type}</p>
                <p className="text-xs text-gray-300 leading-relaxed">{active.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-dark-800 border border-white/10 space-y-2">
                <span className="text-[11px] text-gray-400 uppercase font-semibold">Response & Facility Routing</span>
                <p className="text-xs text-cyan-300 font-bold">Nearest Target Facility:</p>
                <p className="text-xs text-white font-semibold">{active.nearestFacility}</p>
                <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact: {active.phone}</span>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-white">Emergency Timeline:</span>
              <div className="flex items-center justify-between text-xs text-gray-400 bg-dark-800 p-3 rounded-xl">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Panic Button Triggered (Offline Cache)
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Radio className="w-4 h-4" /> Bounced via Mesh Relay Node #14
                </span>
                <span className={`flex items-center gap-1.5 ${dispatched[active.id] ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <Ambulance className="w-4 h-4" /> {dispatched[active.id] ? 'Responder Dispatched' : 'Awaiting Dispatch'}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Emergency GPS Map */}
          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-white text-base">Live Emergency GPS Location Map</h3>
            <VillageMap heightClassName="h-[360px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
