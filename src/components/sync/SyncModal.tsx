'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, RefreshCw, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';

export const SyncModal: React.FC = () => {
  const { isSyncing, syncStepText } = useApp();

  if (!isSyncing) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md rounded-2xl bg-dark-900 border border-electric-500/40 p-6 text-center shadow-2xl shadow-electric-500/20"
        >
          {/* Animated Satellite Icon */}
          <div className="relative mx-auto w-20 h-20 rounded-full bg-electric-500/10 border border-electric-500/30 flex items-center justify-center mb-6">
            <Radio className="w-10 h-10 text-electric-400 animate-pulse" />
            <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping" />
          </div>

          <h3 className="font-poppins font-bold text-xl text-white mb-2">Hybrid Sync Engine Active</h3>
          <p className="text-xs text-gray-400 mb-6">
            Establishing secure relay handshake between IndexedDB local store and central cloud nodes.
          </p>

          {/* Progress step */}
          <div className="p-4 rounded-xl bg-dark-800/80 border border-white/10 flex items-center gap-3 justify-center mb-6">
            <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
            <span className="text-sm font-medium text-cyan-300">{syncStepText || 'Processing offline queue...'}</span>
          </div>

          {/* Visual Indicators */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-gray-400">
            <div className="p-2 rounded-lg bg-dark-800 border border-white/5 flex flex-col items-center gap-1">
              <Database className="w-4 h-4 text-electric-400" />
              <span>IndexedDB</span>
            </div>
            <div className="p-2 rounded-lg bg-dark-800 border border-white/5 flex flex-col items-center gap-1">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Mesh Relay</span>
            </div>
            <div className="p-2 rounded-lg bg-dark-800 border border-white/5 flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cloud Sync</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
