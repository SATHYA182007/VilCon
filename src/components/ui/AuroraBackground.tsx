'use client';

import React from 'react';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Mesh background base */}
      <div className="absolute inset-0 bg-[#0B0F17]" />

      {/* Radial aurora gradients */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-30 animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(6, 186, 212, 0) 70%)',
        }}
      />
      <div
        className="absolute top-[30%] -right-[15%] w-[55vw] h-[55vw] rounded-full blur-[160px] opacity-25 animate-aurora"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(16, 185, 129, 0) 70%)',
        }}
      />
      <div
        className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-[130px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(6, 186, 212, 0.7) 0%, rgba(59, 130, 246, 0) 70%)',
        }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
