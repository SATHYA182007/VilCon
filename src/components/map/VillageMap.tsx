'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/lib/context/AppContext';

export interface MapMarkerItem {
  id: string;
  name: string;
  type: 'village' | 'tower' | 'hospital' | 'school' | 'emergency';
  lat: number;
  lng: number;
  status: 'Online' | 'Degraded' | 'Offline' | 'Relay';
  signalDbm?: number;
  details: string;
}

const SAMPLE_MARKERS: MapMarkerItem[] = [
  { id: 'v1', name: 'Bhojpur Village', type: 'village', lat: 25.5941, lng: 85.1376, status: 'Online', signalDbm: -72, details: '1,420 Residents • Mesh Relay Node #14 Active' },
  { id: 'v2', name: 'Rampur North', type: 'village', lat: 25.612, lng: 85.155, status: 'Degraded', signalDbm: -105, details: '850 Residents • Solar Battery Low (28%)' },
  { id: 'v3', name: 'Sunderpur Cluster', type: 'village', lat: 25.578, lng: 85.112, status: 'Offline', signalDbm: -120, details: '610 Residents • Fiber Cut Detected • Offline Queue Active' },
  { id: 'v4', name: 'Devgarh Hill', type: 'village', lat: 25.625, lng: 85.122, status: 'Relay', signalDbm: -88, details: '940 Residents • Connected via Local Relay Node' },
  { id: 't1', name: 'Tower Alpha-01', type: 'tower', lat: 25.599, lng: 85.142, status: 'Online', details: '5G Hybrid Satellite Gateway • Bandwidth 150Mbps' },
  { id: 't2', name: 'Relay Node Beta-04', type: 'tower', lat: 25.615, lng: 85.135, status: 'Relay', details: 'Solar-Powered LoRa Mesh Node • 12km Range' },
  { id: 'h1', name: 'Bhojpur District Hospital', type: 'hospital', lat: 25.602, lng: 85.128, status: 'Online', details: '24/7 ICU • Telemedicine Hub • 3 Ambulances' },
  { id: 's1', name: 'Government High School', type: 'school', lat: 25.591, lng: 85.148, status: 'Online', details: 'Digital Academy Hub • Offline Server Local Cache' },
  { id: 'e1', name: 'SOS Alert: Snakebite Trauma', type: 'emergency', lat: 25.582, lng: 85.118, status: 'Offline', details: 'CRITICAL • Villager Ramesh K. • Responder En Route' },
];

export const VillageMap: React.FC<{ heightClassName?: string }> = ({ heightClassName = 'h-[500px]' }) => {
  const { networkMode } = useApp();
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerItem | null>(SAMPLE_MARKERS[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Dynamic Leaflet rendering safely for SSR
  useEffect(() => {
    import('leaflet').then((L) => {
      setLeafletLoaded(true);
    });
  }, []);

  const filteredMarkers = SAMPLE_MARKERS.filter((m) => filterType === 'all' || m.type === filterType);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-white/10 ${heightClassName} bg-dark-900 flex flex-col md:flex-row`}>
      {/* Map Control Sidebar */}
      <div className="w-full md:w-80 bg-dark-900/90 border-r border-white/10 p-4 flex flex-col justify-between z-20">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-bold text-white text-base">Village Connectivity Map</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
              Live OpenStreetMap
            </span>
          </div>

          {/* Layer Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['all', 'village', 'tower', 'hospital', 'emergency'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  filterType === type
                    ? 'bg-electric-500 text-white shadow-md shadow-electric-500/30'
                    : 'bg-dark-800 text-gray-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Marker Details Card */}
          {selectedMarker && (
            <div className="p-3.5 rounded-xl bg-dark-800 border border-white/10 space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{selectedMarker.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    selectedMarker.status === 'Online'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : selectedMarker.status === 'Degraded'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : selectedMarker.status === 'Relay'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                  }`}
                >
                  {selectedMarker.status}
                </span>
              </div>
              <p className="text-xs text-gray-300">{selectedMarker.details}</p>
              {selectedMarker.signalDbm && (
                <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-white/5">
                  <span>Signal Strength:</span>
                  <span className="font-mono text-cyan-300 font-bold">{selectedMarker.signalDbm} dBm</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="space-y-1.5 text-xs text-gray-400 border-t border-white/10 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Online Satellite Towers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>Mesh Relay Nodes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span>Active Emergency SOS Incidents</span>
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Surface */}
      <div className="flex-1 relative bg-[#0d1424] flex items-center justify-center p-4">
        {/* Simulated Map Canvas Graphic with animated signal rings & nodes */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

        {/* Interactive Simulated Map Points */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Signal Coverage Circles */}
          <div className="absolute w-72 h-72 rounded-full border border-cyan-500/20 bg-cyan-500/5 animate-pulse-slow" />
          <div className="absolute w-[450px] h-[450px] rounded-full border border-electric-500/10 bg-electric-500/5" />

          {/* Map Node Pins */}
          {filteredMarkers.map((marker) => {
            const isSelected = selectedMarker?.id === marker.id;
            return (
              <button
                key={marker.id}
                onClick={() => setSelectedMarker(marker)}
                style={{
                  top: `${50 + (marker.lat - 25.598) * 1200}%`,
                  left: `${50 + (marker.lng - 85.135) * 1200}%`,
                }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300 z-30 group ${
                  isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                }`}
              >
                <div
                  className={`p-2 rounded-xl border shadow-xl flex items-center gap-1.5 ${
                    marker.type === 'emergency'
                      ? 'bg-rose-600 border-rose-400 text-white animate-bounce'
                      : marker.type === 'hospital'
                      ? 'bg-emerald-600 border-emerald-400 text-white'
                      : marker.type === 'tower'
                      ? 'bg-cyan-600 border-cyan-400 text-white'
                      : 'bg-dark-800 border-white/20 text-electric-300'
                  }`}
                >
                  <span className="text-xs font-bold whitespace-nowrap">{marker.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Map Status Overlay Badge */}
        <div className="absolute bottom-4 right-4 z-30 px-3 py-1.5 rounded-xl bg-dark-900/90 border border-white/10 backdrop-blur-md text-xs text-gray-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>OpenStreetMap Server Connected • Hybrid Radar Active</span>
        </div>
      </div>
    </div>
  );
};
