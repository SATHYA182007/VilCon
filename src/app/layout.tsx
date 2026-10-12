import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context/AppContext';
import { Navbar } from '@/components/navbar/Navbar';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { SyncModal } from '@/components/sync/SyncModal';
import { VillageCopilotModal } from '@/components/ai/VillageCopilotModal';

export const metadata: Metadata = {
  title: 'VillageConnect AI – Intelligent Rural Connectivity & Essential Services Platform',
  description: 'AI-powered offline-first platform enabling rural communities to access healthcare, education, emergency response, and government schemes seamless during low or zero internet connectivity.',
  keywords: ['Rural AI', 'Offline First', 'Telemedicine', 'Emergency SOS', 'PWA', 'Mesh Relay', 'Government Schemes'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0B0F17] text-gray-100 antialiased selection:bg-electric-500 selection:text-white">
        <AppProvider>
          <AuroraBackground />
          <Navbar />
          <SyncModal />
          <VillageCopilotModal />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
