'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Sparkles,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useApp } from '@/lib/context/AppContext';
import { evaluateSchemeEligibility, SchemeRecommendation } from '@/lib/ai/gemini';
import { db } from '@/lib/offline/db';

export default function SchemesPage() {
  const { networkMode, refreshUnsyncedCount, addNotification, userName } = useApp();

  const [land, setLand] = useState(1.5);
  const [income, setIncome] = useState(180000);
  const [age, setAge] = useState(38);
  const [isFarmer, setIsFarmer] = useState(true);

  const [appliedSchemes, setAppliedSchemes] = useState<Record<string, boolean>>({});

  const recommendations = evaluateSchemeEligibility({
    age,
    landHectares: land,
    incomePerYear: income,
    isFarmer,
  });

  const isOffline = networkMode === 'Offline';

  const handleApply = async (scheme: SchemeRecommendation) => {
    setAppliedSchemes((prev) => ({ ...prev, [scheme.schemeId]: true }));

    const uuid = `app-${Date.now()}`;
    await db.schemeApplications.add({
      uuid,
      timestamp: new Date().toISOString(),
      applicantName: userName,
      aadhaarOrId: '9988-7766-5544',
      schemeId: scheme.schemeId,
      schemeTitle: scheme.title,
      category: 'Direct Benefit Transfer',
      status: isOffline ? 'Pending Sync' : 'Submitted',
      synced: !isOffline,
    });

    await refreshUnsyncedCount();

    addNotification({
      title: isOffline ? 'Application Saved Offline' : 'Scheme Application Submitted',
      message: isOffline
        ? `Application for "${scheme.title}" saved to IndexedDB local vault. Will sync when signal returns.`
        : `Application for "${scheme.title}" submitted directly to Panchayat Officer.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-amber-950/80 via-dark-900 to-electric-950/80 border border-amber-500/30 backdrop-blur-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Government Schemes Module
            </span>
            <span className="text-xs text-gray-400">GramAI Eligibility Calculator</span>
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            PM Government Schemes & Subsidies
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Check your personal eligibility match score and apply offline without internet
          </p>
        </div>
      </div>

      {/* AI ELIGIBILITY CALCULATOR FORM */}
      <GlassCard glowColor="cyan" className="space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="font-poppins font-bold text-white text-lg">Your Profile & Eligibility Specs</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Land Holding (Hectares)</label>
            <input
              type="number"
              value={land}
              onChange={(e) => setLand(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 rounded-xl bg-dark-800 border border-white/10 text-white font-bold text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Annual Household Income (₹)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(parseInt(e.target.value) || 0)}
              className="w-full p-2.5 rounded-xl bg-dark-800 border border-white/10 text-white font-bold text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Applicant Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              className="w-full p-2.5 rounded-xl bg-dark-800 border border-white/10 text-white font-bold text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1 flex flex-col justify-end">
            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-800 border border-white/10 text-xs text-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={isFarmer}
                onChange={(e) => setIsFarmer(e.target.checked)}
                className="rounded text-amber-500 focus:ring-0"
              />
              <span className="font-bold">Registered Farmer Household</span>
            </label>
          </div>
        </div>
      </GlassCard>

      {/* MATCHED SCHEMES LIST */}
      <div className="space-y-4">
        <h3 className="font-poppins font-bold text-white text-xl">Top Matched Schemes for You</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec) => (
            <GlassCard key={rec.schemeId} glowColor={rec.matchScore > 85 ? 'emerald' : 'blue'} className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-white">{rec.title}</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/30">
                    {rec.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{rec.benefits}</p>

                <div className="p-3 rounded-xl bg-dark-800 border border-white/10 space-y-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase">Required Documents:</span>
                  <p className="text-xs text-cyan-300 font-medium">{rec.requiredDocs.join(' • ')}</p>
                </div>
              </div>

              <div>
                {appliedSchemes[rec.schemeId] ? (
                  <button className="w-full py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Application Filed ({isOffline ? 'Queued Offline' : 'Submitted'})</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleApply(rec)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-electric-600 text-white font-bold text-xs shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply Now {isOffline ? '(Offline Mode)' : ''}</span>
                  </button>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
