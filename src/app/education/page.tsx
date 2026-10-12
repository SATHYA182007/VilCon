'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Download,
  CheckCircle2,
  Play,
  FileText,
  Clock,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useApp } from '@/lib/context/AppContext';

export default function EducationPage() {
  const { addNotification } = useApp();
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({
    'c-1': true,
    'c-3': true,
  });

  const courses = [
    {
      id: 'c-1',
      title: 'Primary School Mathematics & Logic (Grade 1-5)',
      category: 'K-12 Education',
      modules: 12,
      size: '18.5 MB',
      type: 'Video & Audio Lessons',
      desc: 'Complete elementary mathematics curriculum with localized audio explanations in Hindi and regional dialects.',
    },
    {
      id: 'c-2',
      title: 'Digital Literacy & Smartphone Governance',
      category: 'Adult Education',
      modules: 8,
      size: '14.2 MB',
      type: 'Interactive PDF & Video',
      desc: 'Learn how to apply for PM Schemes, make UPI payments, and verify digital land records securely.',
    },
    {
      id: 'c-3',
      title: 'Sustainable Agriculture & Drip Irrigation',
      category: 'Farming Skills',
      modules: 10,
      size: '22.0 MB',
      type: 'Audio & Video Lessons',
      desc: 'Audio lessons on organic composting, soil moisture testing, and crop rotation for high yields.',
    },
    {
      id: 'c-4',
      title: 'Secondary Science & Rural Sanitation',
      category: 'K-12 Education',
      modules: 15,
      size: '28.4 MB',
      type: 'Textbook PDF',
      desc: 'Physics, Chemistry, and Biological hygiene fundamentals tailored for village high school students.',
    },
  ];

  const handleDownloadCourse = (id: string, title: string) => {
    setDownloaded((prev) => ({ ...prev, [id]: true }));
    addNotification({
      title: 'Course Downloaded to Offline Vault',
      message: `"${title}" stored in IndexedDB local cache. Accessible anytime without signal.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-electric-950/80 via-dark-900 to-cyan-950/80 border border-electric-500/30 backdrop-blur-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-electric-500/20 text-electric-300 border border-electric-500/30 font-semibold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Digital Academy Hub
            </span>
            <span className="text-xs text-gray-400">Offline-First Learning Portal</span>
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            Rural Digital Academy & Textbooks
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Download interactive courses, audio lessons, and PDF textbooks for offline study anywhere
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold text-xs flex items-center gap-2">
            <Download className="w-4 h-4" /> 2 Courses Cached Offline
          </span>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((c) => (
          <GlassCard key={c.id} glowColor={downloaded[c.id] ? 'emerald' : 'cyan'} className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-electric-500/20 text-electric-300 font-bold uppercase">
                  {c.category}
                </span>
                <span className="text-xs text-gray-400 font-mono">{c.size}</span>
              </div>
              <h3 className="font-poppins font-bold text-lg text-white">{c.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{c.desc}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-white/5">
                <span>{c.modules} Modules</span>
                <span>Type: {c.type}</span>
              </div>
            </div>

            <div className="pt-2">
              {downloaded[c.id] ? (
                <button className="w-full py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-500/30 transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Start Offline Course</span>
                </button>
              ) : (
                <button
                  onClick={() => handleDownloadCourse(c.id, c.title)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-600 to-cyan-600 text-white font-bold text-xs shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download for Offline Use</span>
                </button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
