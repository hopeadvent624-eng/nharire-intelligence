import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Nharire Intelligence | African Data & AI Platform',
  description: 'Enterprise Data and AI Intelligence Platform by Nharire Data Group',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 flex flex-col h-screen overflow-hidden antialiased selection:bg-amber-500/30 selection:text-amber-200">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
