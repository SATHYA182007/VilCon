'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Radio,
  Wifi,
  WifiOff,
  Sparkles,
  Shield,
  Stethoscope,
  BookOpen,
  Building2,
  AlertTriangle,
  ArrowRight,
  Database,
  CheckCircle2,
  ChevronDown,
  Activity,
  Zap,
  Globe2,
  Users,
  Server,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { VillageMap } from '@/components/map/VillageMap';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const features = [
    {
      icon: <WifiOff className="w-6 h-6 text-cyan-400" />,
      title: 'Offline-First Engine',
      description: 'Zero data loss. All requests, health triage logs, and scheme applications persist in IndexedDB until signal returns.',
      glow: 'cyan' as const,
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-emerald-400" />,
      title: 'Telemedicine Triage',
      description: 'Connect with district doctors via low-bandwidth video calls or offline medical guidance library.',
      glow: 'emerald' as const,
    },
    {
      icon: <Shield className="w-6 h-6 text-rose-400" />,
      title: 'Emergency Mesh SOS',
      description: 'One-tap panic trigger broadcasting GPS coordinates across local radio relay nodes to nearest ambulance.',
      glow: 'violet' as const,
    },
    {
      icon: <Building2 className="w-6 h-6 text-amber-400" />,
      title: 'AI Scheme Eligibility',
      description: 'GramAI evaluates land holdings & income to match villagers with PM-Kisan, Ayushman Bharat, and subsidies.',
      glow: 'blue' as const,
    },
    {
      icon: <BookOpen className="w-6 h-6 text-electric-400" />,
      title: 'Digital Academy',
      description: 'Cached video courses, textbooks, and interactive audio lessons for rural students without internet.',
      glow: 'cyan' as const,
    },
    {
      icon: <Radio className="w-6 h-6 text-violet-400" />,
      title: 'AI Outage Prediction',
      description: 'Predicts tower signal degradation using solar battery health & weather radar before outages occur.',
      glow: 'violet' as const,
    },
  ];

  const stats = [
    { label: 'Villages Empowered', value: '14,280+', change: '+18% this month' },
    { label: 'Emergency Response Time', value: '4.8 Mins', change: '65% faster via mesh' },
    { label: 'Offline Requests Synced', value: '2.4M+', change: '100% data integrity' },
    { label: 'Telemedicine Consults', value: '380,000+', change: 'Direct PHC connection' },
  ];

  const testimonials = [
    {
      quote: 'When the monsoon floods knocked out our cell towers, VillageConnect AI stored my emergency snakebite request offline and routed it through a solar relay node. The ambulance arrived in 12 minutes.',
      name: 'Ramesh Kumar',
      role: 'Villager, Bhojpur District',
      avatar: '👨‍🌾',
    },
    {
      quote: 'As an ANM healthcare worker, I can triage 50 patients a day without worrying about 2G signal drops. The medical records sync automatically when I return to the health center.',
      name: 'Sunita Devi',
      role: 'Healthcare Worker (ANM)',
      avatar: '👩‍⚕️',
    },
    {
      quote: 'The AI Outage Prediction system alerts network admins 6 hours before a tower battery depletes, allowing us to deploy portable solar relays before villages lose connectivity.',
      name: 'Vikram Singh',
      role: 'District Network Administrator',
      avatar: '👨‍💻',
    },
  ];

  const faqs = [
    {
      q: 'How does VillageConnect AI work without an active internet connection?',
      a: 'The application uses a Progressive Web App (PWA) architecture powered by IndexedDB and Service Workers. When internet is unavailable, requests (SOS alerts, scheme forms, health logs) are stored locally in IndexedDB and broadcasted via local mesh relay nodes. When connection restores, the Hybrid Sync Engine automatically syncs data to central cloud databases.',
    },
    {
      q: 'What local regional languages does GramAI Assistant support?',
      a: 'GramAI supports Hindi, Tamil, Telugu, Bengali, Marathi, and English. It includes a voice recorder simulator capable of processing natural speech queries regarding government schemes, farming tips, and first-aid.',
    },
    {
      q: 'Can emergency SOS alerts be sent when there is zero cell coverage?',
      a: 'Yes. Emergency requests are cached locally and transmitted over short-range radio relay nodes (LoRa/WiFi Direct mesh) to nearby villages or response vehicles until reaching a connected node.',
    },
    {
      q: 'Which roles can access the platform?',
      a: 'VillageConnect AI provides 5 specialized dashboards: Villager, Healthcare Worker, Government Officer, Network Administrator, and Emergency Response Team.',
    },
  ];

  return (
    <div className="space-y-24 py-6">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-electric-500/10 via-cyan-500/10 to-violet-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <span>Next-Gen Rural Digital Infrastructure & AI Mesh</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-poppins font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-tight max-w-5xl mx-auto"
        >
          Connecting Every Village.{' '}
          <span className="bg-gradient-to-r from-electric-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent glow-text-blue">
            Empowering Every Life.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          An AI-powered rural connectivity platform bridging healthcare, education, emergency response, and government services even in low or zero internet environments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/roles"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-electric-600 via-cyan-500 to-violet-600 text-white font-poppins font-bold text-base shadow-xl shadow-electric-500/30 hover:shadow-electric-500/50 hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#features"
            className="px-8 py-4 rounded-2xl bg-dark-800/80 border border-white/15 text-gray-200 font-poppins font-semibold text-base hover:bg-white/10 hover:border-cyan-400/40 transition-all"
          >
            Learn More
          </a>
        </motion.div>

        {/* Floating Graphic SaaS Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto mt-12 rounded-3xl p-1 bg-gradient-to-r from-electric-500/30 via-cyan-500/30 to-violet-500/30 shadow-2xl shadow-electric-500/20"
        >
          <div className="rounded-[22px] bg-dark-900/90 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-dark-800/60 border border-white/10 flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-xl bg-electric-500/20 text-electric-400 border border-electric-500/30">
                <Radio className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="font-poppins font-bold text-white text-base">Satellite & Relay Mesh</h3>
              <p className="text-xs text-gray-400">Hybrid connection routing through 5G towers and solar mesh nodes.</p>
            </div>
            <div className="p-5 rounded-2xl bg-dark-800/60 border border-white/10 flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Database className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="font-poppins font-bold text-white text-base">IndexedDB Offline Store</h3>
              <p className="text-xs text-gray-400">Zero data loss. Full persistence when connection drops to 0%.</p>
            </div>
            <div className="p-5 rounded-2xl bg-dark-800/60 border border-white/10 flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
                <Sparkles className="w-8 h-8 animate-spin-slow" />
              </div>
              <h3 className="font-poppins font-bold text-white text-base">GramAI Regional Assistant</h3>
              <p className="text-xs text-gray-400">Voice-enabled AI supporting Hindi, Tamil, Telugu, and English.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl text-white">
            Built for Extreme Rural Connectivity
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Comprehensive digital infrastructure designed to keep essential services alive during network blackout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <GlassCard key={i} glowColor={f.glow} className="space-y-4">
              <div className="p-3 w-fit rounded-xl bg-dark-800 border border-white/10">{f.icon}</div>
              <h3 className="font-poppins font-bold text-lg text-white">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS ARCHITECTURE PIPELINE */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl text-white">
            How Hybrid Mesh Synchronization Works
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
             Seamless transition between live internet, local radio relays, and delayed IndexedDB database synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <GlassCard className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-electric-500/20 text-electric-300 font-bold mx-auto flex items-center justify-center border border-electric-500/30">1</div>
            <h4 className="font-bold text-white text-base">User Action</h4>
            <p className="text-xs text-gray-400">Villager submits SOS, Doctor consult, or Scheme application.</p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 font-bold mx-auto flex items-center justify-center border border-cyan-500/30">2</div>
            <h4 className="font-bold text-white text-base">IndexedDB Store</h4>
            <p className="text-xs text-gray-400">Request is encrypted and written to local Dexie IndexedDB vault.</p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-violet-500/20 text-violet-300 font-bold mx-auto flex items-center justify-center border border-violet-500/30">3</div>
            <h4 className="font-bold text-white text-base">Mesh Relay</h4>
            <p className="text-xs text-gray-400">Packet bounces via solar LoRa mesh node to nearest active tower.</p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 font-bold mx-auto flex items-center justify-center border border-emerald-500/30">4</div>
            <h4 className="font-bold text-white text-base">Cloud Handshake</h4>
            <p className="text-xs text-gray-400">On signal restoration, data auto-syncs with Firebase/Cloud DB.</p>
          </GlassCard>
        </div>
      </section>

      {/* LIVE MAP & HEATMAP SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-poppins font-extrabold text-3xl text-white">Live Village Connectivity Heatmap</h2>
            <p className="text-gray-400 text-sm">Real-time status of cellular towers, mesh nodes, hospitals, and emergency pins.</p>
          </div>
          <Link
            href="/map"
            className="px-4 py-2 rounded-xl bg-electric-500/20 text-electric-300 border border-electric-500/30 text-xs font-semibold hover:bg-electric-500/30 transition-all flex items-center gap-2 w-fit"
          >
            <span>Open Full Map</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <VillageMap heightClassName="h-[480px]" />
      </section>

      {/* IMPACT STATISTICS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <GlassCard key={i} className="text-center space-y-2">
            <span className="font-poppins font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-electric-400 to-cyan-400 bg-clip-text text-transparent">
              {s.value}
            </span>
            <h4 className="font-semibold text-white text-sm">{s.label}</h4>
            <p className="text-[11px] text-emerald-400 font-medium">{s.change}</p>
          </GlassCard>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl text-white">
            Trusted by Villagers & Officials
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Real stories from remote communities powered by VillageConnect AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <GlassCard key={i} className="space-y-4 flex flex-col justify-between">
              <p className="text-sm text-gray-300 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-cyan-400">{t.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-poppins font-extrabold text-3xl text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm">Everything you need to know about offline-first rural connectivity.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-dark-900/80 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left text-white font-poppins font-semibold text-base hover:bg-white/5 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${activeFaq === i ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
              {activeFaq === i && (
                <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-12 border-t border-white/10 text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Radio className="w-6 h-6 text-cyan-400" />
          <span className="font-poppins font-bold text-xl text-white">VillageConnect AI</span>
        </div>
        <p className="text-xs text-gray-400 max-w-lg mx-auto">
          Intelligent Rural Connectivity & Essential Services Digital Infrastructure. Empowering remote India with Offline-First architecture.
        </p>
        <p className="text-[11px] text-gray-500">© 2026 VillageConnect AI • Built with Next.js 15, Framer Motion & Dexie IndexedDB</p>
      </footer>
    </div>
  );
}
