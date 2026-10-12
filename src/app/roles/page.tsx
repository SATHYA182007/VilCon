'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Stethoscope,
  Building2,
  Radio,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useApp, UserRole } from '@/lib/context/AppContext';

export default function RoleSelectionPage() {
  const router = useRouter();
  const { setRole } = useApp();

  const roles = [
    {
      id: 'villager' as UserRole,
      title: 'Villager',
      description: 'Access telemedicine, download offline courses & books, check scheme eligibility, and send 1-tap SOS panic alerts.',
      icon: <User className="w-8 h-8 text-electric-400" />,
      glow: 'blue' as const,
      path: '/dashboard/villager',
      tags: ['Telemedicine', 'SOS Panic', 'Offline Downloads', 'Schemes'],
    },
    {
      id: 'healthcare' as UserRole,
      title: 'Healthcare Worker',
      description: 'Manage telemedicine appointment queue, review patient triage logs, update medicine inventory, and trigger hospital dispatches.',
      icon: <Stethoscope className="w-8 h-8 text-emerald-400" />,
      glow: 'emerald' as const,
      path: '/dashboard/healthcare',
      tags: ['Triage Queue', 'Patient History', 'Pharma Inventory', 'Video Call'],
    },
    {
      id: 'government' as UserRole,
      title: 'Government Officer',
      description: 'Analyze village connectivity heatmaps, approve scheme applications, inspect offline village clusters, and view Recharts analytics.',
      icon: <Building2 className="w-8 h-8 text-amber-400" />,
      glow: 'cyan' as const,
      path: '/dashboard/government',
      tags: ['Connectivity Analytics', 'Scheme Approvals', 'District Heatmap'],
    },
    {
      id: 'network_admin' as UserRole,
      title: 'Network Administrator',
      description: 'Monitor cell towers & solar relay nodes, run AI Outage Predictions, allocate bandwidth, and inspect signal degradation logs.',
      icon: <Radio className="w-8 h-8 text-cyan-400" />,
      glow: 'violet' as const,
      path: '/dashboard/network-admin',
      tags: ['AI Outage Predictor', 'Tower Metrics', 'Mesh Topology'],
    },
    {
      id: 'emergency' as UserRole,
      title: 'Emergency Response Team',
      description: 'Track live SOS panic pings, map GPS disaster locations, assign emergency priority levels, and route nearest ambulances.',
      icon: <Shield className="w-8 h-8 text-rose-400" />,
      glow: 'violet' as const,
      path: '/dashboard/emergency',
      tags: ['Live SOS Feed', 'GPS Map Pins', 'Ambulance Dispatch', 'Critical Triage'],
    },
  ];

  const handleSelectRole = (r: UserRole, path: string) => {
    setRole(r);
    router.push(path);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Role-Based SaaS Ecosystem</span>
        </motion.div>

        <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Select Your Platform Workspace
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          VillageConnect AI tailors controls and offline tools based on your active operational role.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((r) => (
          <GlassCard
            key={r.id}
            glowColor={r.glow}
            onClick={() => handleSelectRole(r.id, r.path)}
            className="cursor-pointer group flex flex-col justify-between space-y-6 hover:scale-[1.02] transition-all"
          >
            <div className="space-y-4">
              <div className="p-3.5 w-fit rounded-2xl bg-dark-800 border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                {r.icon}
              </div>
              <div>
                <h3 className="font-poppins font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{r.description}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {r.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Enter {r.title} Portal</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
