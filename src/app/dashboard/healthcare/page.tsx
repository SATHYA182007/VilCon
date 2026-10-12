'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Users,
  AlertTriangle,
  Pill,
  FileText,
  Video,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Plus,
  ShieldAlert,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useApp } from '@/lib/context/AppContext';

export default function HealthcareDashboard() {
  const { addNotification } = useApp();
  const [selectedPatient, setSelectedPatient] = useState<number>(0);
  const [consulting, setConsulting] = useState(false);

  const patientQueue = [
    {
      id: 1,
      name: 'Sunita Devi',
      age: 42,
      village: 'Bhojpur',
      symptoms: 'High fever (103°F) for 3 days, severe chills, fatigue',
      urgency: 'High',
      time: '10m ago',
      mode: 'Offline Cached Request',
    },
    {
      id: 2,
      name: 'Mahesh Verma',
      age: 58,
      village: 'Rampur',
      symptoms: 'Mild chest tightness, hypertension history',
      urgency: 'Critical',
      time: '25m ago',
      mode: 'Live Video Request',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      age: 8,
      village: 'Sunderpur',
      symptoms: 'Persistent cough, mild asthma wheezing',
      urgency: 'Medium',
      time: '1h ago',
      mode: 'Offline Cached Request',
    },
  ];

  const inventory = [
    { name: 'Anti-Venom Serum (Snakebite)', stock: 12, unit: 'Vials', status: 'Adequate', color: 'text-emerald-400' },
    { name: 'Paracetamol 500mg', stock: 450, unit: 'Tablets', status: 'Sufficient', color: 'text-emerald-400' },
    { name: 'ORS Packets', stock: 210, unit: 'Sachets', status: 'Sufficient', color: 'text-emerald-400' },
    { name: 'Portable Oxygen Cylinders', stock: 2, unit: 'Units', status: 'Low Stock', color: 'text-amber-400' },
    { name: 'Amoxicillin 250mg', stock: 80, unit: 'Capsules', status: 'Low Stock', color: 'text-amber-400' },
  ];

  const activePatient = patientQueue[selectedPatient];

  const startConsultation = () => {
    setConsulting(true);
    addNotification({
      title: 'Consultation Room Active',
      message: `Connected telemedicine session for ${activePatient.name} via PHC bhojpur server.`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-dark-900 to-cyan-950/80 border border-emerald-500/30 backdrop-blur-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
              <Stethoscope className="w-3.5 h-3.5" /> Healthcare Worker Portal
            </span>
            <span className="text-xs text-gray-400">PHC Bhojpur • Dr. Ananya Sharma</span>
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            Telemedicine & Rural Patient Triage
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Review live & offline cached consultation requests • Manage essential medicine inventory
          </p>
        </div>

        <button
          onClick={startConsultation}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 text-white font-poppins font-bold text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Video className="w-5 h-5" />
          <span>Launch Telemed Consult</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard glowColor="emerald" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Pending Triage Queue</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-emerald-300">14 Patients</p>
          <p className="text-[11px] text-gray-400">3 High Priority cases</p>
        </GlassCard>

        <GlassCard glowColor="violet" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Today's Consultations</span>
            <CheckCircle2 className="w-4 h-4 text-violet-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-violet-300">32 Completed</p>
          <p className="text-[11px] text-gray-400">Avg 8.5 min per patient</p>
        </GlassCard>

        <GlassCard glowColor="cyan" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Offline Triage Cache</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-cyan-300">8 Cached Logs</p>
          <p className="text-[11px] text-gray-400">IndexedDB sync active</p>
        </GlassCard>

        <GlassCard glowColor="none" className="space-y-2 border-rose-500/30 bg-rose-500/10">
          <div className="flex items-center justify-between text-xs text-rose-300">
            <span>Emergency SOS Cases</span>
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <p className="font-poppins font-bold text-2xl text-rose-400">1 Active Critical</p>
          <p className="text-[11px] text-rose-300">Ambulance dispatched to Rampur</p>
        </GlassCard>
      </div>

      {/* QUEUE & CONSULTATION WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Patient Triage List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-white text-base">Patient Triage Queue</h3>
            <span className="text-xs text-gray-400">Sorted by Severity</span>
          </div>

          <div className="space-y-3">
            {patientQueue.map((patient, index) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(index)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedPatient === index
                    ? 'bg-emerald-500/10 border-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'bg-dark-900 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-poppins font-bold text-white text-sm">{patient.name}</h4>
                    <span className="text-[11px] text-gray-400">Age {patient.age} • {patient.village}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      patient.urgency === 'Critical'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                        : patient.urgency === 'High'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {patient.urgency}
                  </span>
                </div>
                <p className="text-xs text-gray-300 line-clamp-2 mb-2">{patient.symptoms}</p>
                <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-white/5">
                  <span className="text-cyan-400">{patient.mode}</span>
                  <span>{patient.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center/Right Workspace: Active Consultation Card & Video Simulator */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard glowColor="emerald" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-poppins font-bold text-xl text-white">{activePatient.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                    Age {activePatient.age}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Village: {activePatient.village} • Mode: {activePatient.mode}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={startConsultation}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-colors flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  <span>Start Video Triage</span>
                </button>
              </div>
            </div>

            {/* Video Consultation Simulator Box */}
            <div className="relative w-full h-64 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
              {consulting ? (
                <div className="relative w-full h-full bg-emerald-950/40 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Video className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
                    <p className="font-poppins font-bold text-white text-base">Telemedicine Stream Active</p>
                    <p className="text-xs text-emerald-300">Connected to PHC Bhojpur Low-Bandwidth Gateway (720p)</p>
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-bold animate-pulse">
                    LIVE REC
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3 p-4">
                  <Video className="w-10 h-10 text-gray-500 mx-auto" />
                  <p className="text-xs text-gray-400">Click "Start Video Triage" to initiate encrypted tele-consultation stream</p>
                </div>
              )}
            </div>

            {/* AI Diagnosis Assistant Box */}
            <div className="p-4 rounded-xl bg-dark-800 border border-violet-500/30 space-y-2">
              <div className="flex items-center gap-2 text-violet-300 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>GramAI Clinical Assistant Triage Advice</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Symptoms indicate acute fever with dehydration risk. Recommended Prescriptions: Oral Paracetamol 500mg TDS + ORS 1L daily. If temperature persists &gt; 48h, order malaria blood smear test.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2.5 rounded-xl bg-electric-500 text-white font-bold text-xs hover:bg-electric-600 transition-colors">
                Write E-Prescription
              </button>
              <button className="px-4 py-2.5 rounded-xl bg-dark-800 border border-white/10 text-gray-300 font-bold text-xs hover:bg-white/5 transition-colors">
                Refer to District Hospital
              </button>
            </div>
          </GlassCard>

          {/* Medicine Inventory Section */}
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-emerald-400" />
                <h3 className="font-poppins font-bold text-white text-base">Essential Medicine Stock</h3>
              </div>
              <button className="px-3 py-1 rounded-lg bg-dark-800 text-xs font-semibold text-gray-300 hover:text-white border border-white/10 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Stock
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {inventory.map((item, index) => (
                <div key={index} className="p-3 rounded-xl bg-dark-800 border border-white/10 space-y-1">
                  <span className="font-bold text-xs text-white block truncate">{item.name}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-cyan-300">{item.stock} {item.unit}</span>
                    <span className={`text-[10px] font-bold ${item.color}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
