'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'cyan' | 'emerald' | 'violet' | 'none';
  variant?: 'dark' | 'light' | 'gradient';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowColor = 'none',
  variant = 'dark',
  ...props
}) => {
  const glowStyles = {
    blue: 'border-electric-500/30 hover:border-electric-400/60 shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:shadow-[0_0_35px_rgba(59,130,246,0.3)]',
    cyan: 'border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_25px_rgba(6,186,212,0.15)] hover:shadow-[0_0_35px_rgba(6,186,212,0.3)]',
    emerald: 'border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.3)]',
    violet: 'border-violet-500/30 hover:border-violet-400/60 shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:shadow-[0_0_35px_rgba(139,92,246,0.3)]',
    none: 'border-white/10 hover:border-white/20',
  };

  const bgStyles = {
    dark: 'bg-dark-900/70 backdrop-blur-xl',
    light: 'bg-white/80 backdrop-blur-xl text-dark-900',
    gradient: 'bg-gradient-to-br from-dark-900/90 via-dark-800/80 to-electric-900/40 backdrop-blur-xl',
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'rounded-2xl border p-6 transition-all duration-300',
        bgStyles[variant],
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
