'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  FileCheck,
  Radio,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Download,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard';
import { VillageMap } from '@/components/map/VillageMap';
import { useApp } from '@/lib/context/AppContext';

export default function GovernmentDashboard() {
  const { addNotification } = useApp();

  const [applications, setApplications] = useState([
    { id: 'APP-991', applicant: 'Ramesh Kumar', scheme: 'PM-Kisan Direct Benefit', village: 'Bhojpur', date: 'Today', status: 'Pending Review', docs: 'Aadhaar, Khatoni Land Record' },
    { id: 'APP-992', applicant: 'Sunita Devi', scheme: 'Ayushman Bharat Card', village: 'Rampur', date: 'Yesterday', status: 'Pending Review', docs: 'Ration Card, Photo' },
    { id: 'APP-993', applicant: 'Vikram Singh', scheme: 'PM Solar Pump Subsidy', village: 'Sunderpur', date: '2 days ago', status: 'Approved', docs: 'Land Deed, EB Bill' },
    { id: 'APP-994', applicant: 'Anitha Reddy', scheme: 'Digital Gramin Tablet Grant', village: 'Devgarh', date: '3 days ago', status: 'Pending Review', docs: 'Student ID, Aadhaar' },
  ]);

  const chartData = [
    { day: 'Mon', uptime: 98.4, syncRequests: 1240 },
    { day: 'Tue', uptime: 99.1, syncRequests: 1820 },
    { day: 'Wed', uptime: 94.2, syncRequests: 2410 },
    { day: 'Thu', uptime: 96.8, syncRequests: 1950 },
    { day: 'Fri', uptime: 99.5, syncRequests: 3100 },
    { day: 'Sat', uptime: 98.9, syncRequests: 2800 },
    { day: 'Sun', uptime: 99.8, syncRequests: 3400 },
  ];

  const schemeBarData = [
    { name: 'PM-Kisan', total: 420 },
    { name: 'Ayushman', total: 680 },
    { name: 'Solar Pump', total: 190 },
    { name: 'PM Awas', total: 310 },
    { name: 'Digital Edu', total: 540 },
  ];

  const handleApprove = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Approved' } : app))
    );
    addNotification({
      title: 'Scheme Application Approved',
      message: `Application ${id} approved and routed for Direct Benefit Transfer (DBT).`,
      type: 'success',
    });
  };

  const handleReject = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Needs Resubmission' } : app))
    );
    addNotification({
      title: 'Application Returned',
      message: `Application ${id} marked for document resubmission.`,
      type: 'warning',
    });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-amber-950/80 via-dark-900 to-electric-950/80 border border-amber-500/30 backdrop-blur-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Government Officer Portal
            </span>
            <span className="text-xs text-gray-400">Bhojpur District Administration</span>
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            District Connectivity & Governance Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Real-time inspection of village uptime, scheme processing, and emergency sync compliance
          </p>
        </div>

        <button className="px-5 py-3 rounded-2xl bg-amber-500 text-dark-900 font-poppins font-bold text-xs hover:bg-amber-400 transition-all flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          <span>Export District Audit Report</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard glowColor="cyan" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>District Network Uptime</span>
            <Radio className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-cyan-300">98.4% Average</p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +2.1% from last week
          </p>
        </GlassCard>

        <GlassCard glowColor="blue" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Total Schemes Applied</span>
            <FileCheck className="w-4 h-4 text-electric-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-electric-300">2,140 Applications</p>
          <p className="text-[11px] text-gray-400">82% submitted offline via PWA</p>
        </GlassCard>

        <GlassCard glowColor="violet" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Offline Village Clusters</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-amber-300">2 Villages</p>
          <p className="text-[11px] text-gray-400">Relay Mesh operational</p>
        </GlassCard>

        <GlassCard glowColor="emerald" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Direct Benefit Disbursed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-poppins font-bold text-2xl text-emerald-300">₹14.2 Lakhs</p>
          <p className="text-[11px] text-gray-400">Directly into Aadhaar accounts</p>
        </GlassCard>
      </div>

      {/* RECHARTS ANALYTICS GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glowColor="cyan" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-white text-base">Weekly Uptime & Data Sync Traffic</h3>
            <span className="text-xs text-cyan-400 font-semibold">Live Telemetry</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} domain={[90, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="uptime" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorUptime)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard glowColor="blue" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-white text-base">Scheme Applications by Category</h3>
            <span className="text-xs text-electric-400 font-semibold">Monthly Breakdown</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schemeBarData}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* SCHEME APPROVAL TABLE */}
      <GlassCard glowColor="violet" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="font-poppins font-bold text-white text-lg">Pending Government Scheme Applications</h3>
            <p className="text-xs text-gray-400">Applications submitted online or queued offline via village kiosks</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 text-xs text-gray-300 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter by Village
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-dark-800/80 uppercase text-[10px] text-gray-400 font-semibold">
              <tr>
                <th className="p-3">App ID</th>
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Scheme Title</th>
                <th className="p-3">Village</th>
                <th className="p-3">Documents</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-mono font-bold text-cyan-400">{app.id}</td>
                  <td className="p-3 font-bold text-white">{app.applicant}</td>
                  <td className="p-3">{app.scheme}</td>
                  <td className="p-3 text-gray-400">{app.village}</td>
                  <td className="p-3 text-[11px] text-gray-400">{app.docs}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : app.status === 'Pending Review'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    {app.status === 'Pending Review' && (
                      <>
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app.id)}
                          className="px-2.5 py-1 rounded-lg bg-dark-800 border border-white/10 text-gray-300 hover:text-white transition-colors"
                        >
                          Return
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* HEATMAP SECTION */}
      <div className="space-y-3">
        <h3 className="font-poppins font-bold text-white text-lg">District Tower & Village Heatmap</h3>
        <VillageMap heightClassName="h-[420px]" />
      </div>
    </div>
  );
}
