'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Video,
  Mic,
  MicOff,
  Camera,
  PhoneOff,
  BookOpen,
  Pill,
  Clock,
  Sparkles,
  Shield,
  FileText,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useApp } from '@/lib/context/AppContext';
import { classifyHealthSymptoms, HealthTriageResult } from '@/lib/ai/gemini';

export default function TelemedicinePage() {
  const { networkMode, addNotification } = useApp();
  const [symptomsInput, setSymptomsInput] = useState('');
  const [triageResult, setTriageResult] = useState<HealthTriageResult | null>(null);
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);

  const [reminders, setReminders] = useState([
    { id: 1, medicine: 'Paracetamol 500mg', time: '08:00 AM', dosage: '1 Tablet', status: 'Taken' },
    { id: 2, medicine: 'ORS Solution 200ml', time: '02:00 PM', dosage: '1 Sachet', status: 'Pending' },
    { id: 3, medicine: 'Amoxicillin 250mg', time: '08:00 PM', dosage: '1 Capsule', status: 'Pending' },
  ]);

  const guides = [
    { title: 'Emergency Snakebite Triage & First Aid', size: '2.4 MB', type: 'PDF Manual', desc: 'Critical steps for venomous snake bites in rural areas. Do not tie tourniquet too tight; keep patient immobilized.' },
    { title: 'High Fever & Heatstroke Response Manual', size: '1.8 MB', type: 'Audio Guide', desc: 'Symptom guide for heat exhaustion during summer harvest months.' },
    { title: 'Maternal & Newborn Emergency Care', size: '3.1 MB', type: 'PDF Book', desc: 'Step-by-step guidance for emergency labor before hospital transport.' },
  ];

  const handleAnalyzeSymptoms = () => {
    if (!symptomsInput.trim()) return;
    const result = classifyHealthSymptoms(symptomsInput);
    setTriageResult(result);
    addNotification({
      title: 'GramAI Health Triage Generated',
      message: `Urgency classified as ${result.urgency}. Recommended actions updated.`,
      type: result.urgency.includes('Emergency') ? 'emergency' : 'info',
    });
  };

  const toggleCall = () => {
    setInCall(!inCall);
    if (!inCall) {
      addNotification({
        title: 'Telemedicine Session Connected',
        message: 'Stream encrypted via Bhojpur PHC Gateway (Low Bandwidth WebRTC).',
        type: 'success',
      });
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-dark-900 to-cyan-950/80 border border-emerald-500/30 backdrop-blur-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
              <Stethoscope className="w-3.5 h-3.5" /> Essential Healthcare Module
            </span>
            <span className="text-xs text-gray-400">Offline & Online Tele-health</span>
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            Telemedicine & Medical Library
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Consult doctors online via video or access downloaded emergency medical guides offline
          </p>
        </div>

        <button
          onClick={toggleCall}
          className={`px-6 py-3.5 rounded-2xl font-poppins font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2 ${
            inCall
              ? 'bg-rose-600 text-white'
              : 'bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 text-white shadow-emerald-500/30 hover:scale-105'
          }`}
        >
          {inCall ? <PhoneOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          <span>{inCall ? 'End Call Session' : 'Start Video Call with PHC Doctor'}</span>
        </button>
      </div>

      {/* VIDEO CONSULTATION SIMULATOR SECTION */}
      {inCall && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="rounded-3xl border border-emerald-500/40 bg-black p-4 space-y-4 overflow-hidden shadow-2xl shadow-emerald-500/20"
        >
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-dark-950 overflow-hidden flex items-center justify-center border border-white/10">
            <div className="text-center space-y-3">
              <Video className="w-16 h-16 text-emerald-400 mx-auto animate-pulse" />
              <h3 className="font-poppins font-bold text-white text-lg">Dr. Ananya Sharma (Primary Health Center)</h3>
              <p className="text-xs text-emerald-300">Low-Bandwidth 2G Mesh Video Mode • 15 FPS HD Audio</p>
            </div>

            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ENCRYPTED TELE-HEALTH</span>
            </div>

            {/* Video Controls overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-2xl bg-dark-900/90 border border-white/20 backdrop-blur-md">
              <button
                onClick={() => setMuted(!muted)}
                className={`p-3 rounded-xl ${muted ? 'bg-rose-600 text-white' : 'bg-dark-800 text-gray-200'}`}
              >
                {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button onClick={toggleCall} className="p-3 rounded-xl bg-rose-600 text-white">
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* AI SYMPTOM CHECKER & TRIAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glowColor="emerald" className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="font-poppins font-bold text-white text-lg">GramAI Instant Symptom Triage</h3>
          </div>
          <p className="text-xs text-gray-400">Describe symptoms in English or regional dialect for instant AI urgency classification.</p>

          <div className="space-y-2">
            <textarea
              rows={3}
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
              placeholder="e.g. High fever with chills, joint pain for 2 days..."
              className="w-full p-3.5 rounded-xl bg-dark-800 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleAnalyzeSymptoms}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-xs shadow-md hover:scale-[1.01] transition-all"
            >
              Analyze Symptoms & Get Advice
            </button>
          </div>

          {triageResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-dark-800 border border-white/10 space-y-2 mt-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">Triage Summary</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    triageResult.urgency.includes('Emergency')
                      ? 'bg-rose-600 text-white animate-bounce'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {triageResult.urgency}
                </span>
              </div>
              <p className="text-xs text-cyan-300 font-semibold">{triageResult.diagnosisSummary}</p>
              <div className="space-y-1 text-xs text-gray-300 pt-2 border-t border-white/5">
                <span className="font-bold text-white text-[11px]">Recommended Actions:</span>
                <ul className="list-disc list-inside space-y-0.5 text-gray-400">
                  {triageResult.recommendedActions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </GlassCard>

        {/* MEDICINE REMINDER MANAGER */}
        <GlassCard glowColor="cyan" className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-cyan-400" />
              <h3 className="font-poppins font-bold text-white text-lg">Daily Medicine Reminders</h3>
            </div>
            <button className="px-2.5 py-1 rounded-lg bg-dark-800 border border-white/10 text-xs font-semibold text-gray-300 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Dose
            </button>
          </div>

          <div className="space-y-3">
            {reminders.map((rem) => (
              <div key={rem.id} className="p-3.5 rounded-xl bg-dark-800 border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">{rem.medicine}</h4>
                  <span className="text-[11px] text-gray-400">{rem.dosage} • Time: {rem.time}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    rem.status === 'Taken'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {rem.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* OFFLINE MEDICAL GUIDES LIBRARY */}
      <GlassCard glowColor="violet" className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            <h3 className="font-poppins font-bold text-white text-lg">Offline Emergency Medical Guides</h3>
          </div>
          <span className="text-xs text-gray-400">Available Without Internet</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guides.map((g, i) => (
            <div key={i} className="p-4 rounded-xl bg-dark-800 border border-white/10 space-y-2 hover:border-violet-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-bold uppercase">{g.type}</span>
                <span className="text-[10px] text-gray-400">{g.size}</span>
              </div>
              <h4 className="font-bold text-sm text-white">{g.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{g.desc}</p>
              <button className="w-full mt-2 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors">
                Read Cached Guide
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
