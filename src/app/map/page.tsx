'use client';

import React from 'react';
import { Radio, ArrowLeft, Layers, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { VillageMap } from '@/components/map/VillageMap';

export default function FullscreenMapPage() {
  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white mt-1">
            District Connectivity & Mesh Radar Map
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Interactive OpenStreetMap tracking active 5G towers, solar mesh relays, primary health centers, and emergency SOS pings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5">
            <Radio className="w-4 h-4 animate-pulse" /> Live Radar Tracking
          </span>
        </div>
      </div>

      <VillageMap heightClassName="h-[680px]" />
    </div>
  );
}
