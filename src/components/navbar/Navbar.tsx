'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi,
  WifiOff,
  Radio,
  SignalLow,
  Sparkles,
  RefreshCw,
  User,
  Shield,
  Stethoscope,
  Building2,
  AlertTriangle,
  ChevronDown,
  Menu,
  X,
  Bot,
} from 'lucide-react';
import { useApp, NetworkMode, UserRole } from '@/lib/context/AppContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    role,
    setRole,
    networkMode,
    setNetworkMode,
    unsyncedCount,
    triggerSync,
    isSyncing,
    setCopilotOpen,
  } = useApp();

  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const networkOptions: { mode: NetworkMode; label: string; icon: React.ReactNode; color: string }[] = [
    { mode: 'Online', label: 'Online (Satellite 5G)', icon: <Wifi className="w-4 h-4 text-emerald-400" />, color: 'text-emerald-400' },
    { mode: '2G / Low-Bandwidth', label: '2G Low Bandwidth', icon: <SignalLow className="w-4 h-4 text-amber-400" />, color: 'text-amber-400' },
    { mode: 'Local Mesh Relay', label: 'Local Mesh Relay', icon: <Radio className="w-4 h-4 text-cyan-400" />, color: 'text-cyan-400' },
    { mode: 'Offline', label: 'Offline Mode Active', icon: <WifiOff className="w-4 h-4 text-rose-400" />, color: 'text-rose-400' },
  ];

  const roleOptions: { role: UserRole; label: string; icon: React.ReactNode; path: string }[] = [
    { role: 'villager', label: 'Villager', icon: <User className="w-4 h-4 text-electric-400" />, path: '/dashboard/villager' },
    { role: 'healthcare', label: 'Healthcare Worker', icon: <Stethoscope className="w-4 h-4 text-emerald-400" />, path: '/dashboard/healthcare' },
    { role: 'government', label: 'Government Officer', icon: <Building2 className="w-4 h-4 text-amber-400" />, path: '/dashboard/government' },
    { role: 'network_admin', label: 'Network Admin', icon: <Radio className="w-4 h-4 text-cyan-400" />, path: '/dashboard/network-admin' },
    { role: 'emergency', label: 'Emergency Team', icon: <Shield className="w-4 h-4 text-rose-400" />, path: '/dashboard/emergency' },
  ];

  const handleSelectRole = (r: UserRole, path: string) => {
    setRole(r);
    setRoleDropdownOpen(false);
    router.push(path);
  };

  const navLinks = [
    { name: 'Dashboard', href: `/dashboard/${role}` },
    { name: 'Telemedicine', href: '/telemedicine' },
    { name: 'Education', href: '/education' },
    { name: 'Schemes', href: '/schemes' },
    { name: 'Map & Relay', href: '/map' },
  ];

  const currentNetworkInfo = networkOptions.find((n) => n.mode === networkMode) || networkOptions[0];
  const currentRoleInfo = roleOptions.find((r) => r.role === role) || roleOptions[0];

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3 backdrop-blur-xl bg-dark-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-600 via-cyan-500 to-violet-500 p-[1px] shadow-lg shadow-electric-500/20 group-hover:shadow-electric-500/40 transition-all">
            <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center">
              <Radio className="w-5 h-5 text-cyan-400 animate-pulse-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-poppins font-bold text-lg tracking-tight text-white">VillageConnect</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-electric-500/20 text-electric-300 font-semibold border border-electric-500/30">AI</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide">HYBRID RURAL MESH</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-cyan-400 ${
                  isActive ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-0.5' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Network State Switcher */}
          <div className="relative">
            <button
              onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-800/80 border border-white/10 hover:border-cyan-500/40 text-xs font-medium text-gray-200 transition-all"
            >
              {currentNetworkInfo.icon}
              <span className={currentNetworkInfo.color}>{currentNetworkInfo.mode}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            <AnimatePresence>
              {networkDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-dark-800 border border-white/10 shadow-2xl p-2 z-50"
                >
                  <div className="px-2 py-1 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                    Simulate Connectivity
                  </div>
                  {networkOptions.map((opt) => (
                    <button
                      key={opt.mode}
                      onClick={() => {
                        setNetworkMode(opt.mode);
                        setNetworkDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-all ${
                        networkMode === opt.mode ? 'bg-electric-500/20 text-white font-semibold' : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sync Trigger Badge */}
          {unsyncedCount > 0 && (
            <button
              onClick={() => triggerSync()}
              disabled={isSyncing}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium hover:bg-amber-500/20 transition-all animate-pulse"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync Queue ({unsyncedCount})</span>
            </button>
          )}

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-electric-500/10 border border-electric-500/30 text-xs font-semibold text-electric-300 hover:bg-electric-500/20 transition-all"
            >
              {currentRoleInfo.icon}
              <span>{currentRoleInfo.label}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {roleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-dark-800 border border-white/10 shadow-2xl p-2 z-50"
                >
                  <div className="px-2 py-1 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                    Switch Dashboard Persona
                  </div>
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.role}
                      onClick={() => handleSelectRole(opt.role, opt.path)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-all ${
                        role === opt.role ? 'bg-electric-500/20 text-white font-semibold' : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* GramAI Copilot Launcher */}
          <button
            onClick={() => setCopilotOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-electric-600 text-white font-medium text-xs shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-105"
          >
            <Bot className="w-4 h-4 text-cyan-300" />
            <span>GramAI</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setCopilotOpen(true)}
            className="p-2 rounded-lg bg-violet-600/30 text-violet-300 border border-violet-500/30"
          >
            <Bot className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-dark-800 text-gray-300 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden mt-3 pt-3 border-t border-white/10 overflow-hidden flex flex-col gap-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {networkOptions.map((opt) => (
                <button
                  key={opt.mode}
                  onClick={() => {
                    setNetworkMode(opt.mode);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                    networkMode === opt.mode ? 'bg-electric-500/20 text-white font-semibold' : 'bg-dark-800 text-gray-400'
                  }`}
                >
                  {opt.icon}
                  <span>{opt.mode}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-gray-500 font-semibold uppercase">Dashboards</span>
              {roleOptions.map((opt) => (
                <button
                  key={opt.role}
                  onClick={() => {
                    handleSelectRole(opt.role, opt.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                    role === opt.role ? 'bg-electric-500/20 text-white font-semibold' : 'text-gray-300'
                  }`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
