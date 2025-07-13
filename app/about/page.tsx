'use client';

import { useState } from 'react';
import { FileText, Shield, Heart, Code, Users, Zap, Menu, X } from 'lucide-react';

type SectionId = 'terms' | 'privacy' | 'support' | 'developers' | 'community' | 'changelog';

const aboutSections = [
  { id: 'terms' as SectionId, label: 'terms of service', icon: FileText },
  { id: 'privacy' as SectionId, label: 'privacy policy', icon: Shield },
  { id: 'support' as SectionId, label: 'support', icon: Heart },
  { id: 'developers' as SectionId, label: 'developers', icon: Code },
  { id: 'community' as SectionId, label: 'community', icon: Users },
  { id: 'changelog' as SectionId, label: 'changelog', icon: Zap },
];

const contentMap: Record<SectionId, JSX.Element> = {
  terms: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">terms of service</h2>
      <div className="space-y-4 text-sm leading-relaxed">
        <p>by using topaz video downloader, you agree to these terms:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>you will only download content you have permission to access</li>
          <li>you will not use this service for illegal purposes</li>
          <li>you will respect copyright and intellectual property rights</li>
          <li>we are not responsible for how you use downloaded content</li>
          <li>we may update these terms at any time</li>
        </ul>
        <p className="text-light-secondary dark:text-[#b3b8c5]">last updated: december 2024</p>
      </div>
    </div>
  ),
  privacy: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">privacy policy</h2>
      <div className="space-y-4 text-sm leading-relaxed">
        <p>we respect your privacy and are committed to protecting it:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>we do not store or log your download history</li>
          <li>we do not collect personal information</li>
          <li>we do not track your browsing activity</li>
          <li>we use local storage for your preferences only</li>
          <li>we do not share data with third parties</li>
        </ul>
        <p className="text-light-secondary dark:text-[#b3b8c5]">your privacy is our priority</p>
      </div>
    </div>
  ),
  support: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">support</h2>
      <div className="space-y-4 text-sm leading-relaxed">
        <p>need help? here's how to get support:</p>
        <div className="space-y-3">
          <div className="p-4 bg-light-card dark:bg-[#18181b] rounded-lg">
            <h3 className="font-semibold mb-2">common issues</h3>
            <ul className="space-y-1 text-light-secondary dark:text-[#b3b8c5]">
              <li>• make sure yt-dlp is installed and in your PATH</li>
              <li>• check that FFmpeg is properly installed</li>
              <li>• verify the video URL is accessible</li>
              <li>• ensure you have sufficient disk space</li>
            </ul>
          </div>
          <div className="p-4 bg-light-card dark:bg-[#18181b] rounded-lg">
            <h3 className="font-semibold mb-2">getting help</h3>
            <ul className="space-y-1 text-light-secondary dark:text-[#b3b8c5]">
              <li>• check the troubleshooting section in README</li>
              <li>• visit our GitHub repository for issues</li>
              <li>• join our community discussions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  developers: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">developers</h2>
      <div className="space-y-4 text-sm leading-relaxed">
        <p>interested in contributing? here's what you need to know:</p>
        <div className="space-y-3">
          <div className="p-4 bg-light-card dark:bg-[#18181b] rounded-lg">
            <h3 className="font-semibold mb-2">tech stack</h3>
            <ul className="space-y-1 text-light-secondary dark:text-[#b3b8c5]">
              <li>• Next.js 14 with App Router</li>
              <li>• TypeScript for type safety</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Zustand for state management</li>
              <li>• yt-dlp for video processing</li>
            </ul>
          </div>
          <div className="p-4 bg-light-card dark:bg-[#18181b] rounded-lg">
            <h3 className="font-semibold mb-2">getting started</h3>
            <ul className="space-y-1 text-light-secondary dark:text-[#b3b8c5]">
              <li>• fork the repository</li>
              <li>• install dependencies with npm install</li>
              <li>• run npm run dev to start development</li>
              <li>• check the contributing guidelines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  community: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">community</h2>
      <div className="space-y-4 text-sm leading-relaxed">
        <p>join our growing community of users and developers:</p>
        <div className="space-y-3">
          <div className="p-4 bg-light-card dark:bg-[#18181b] rounded-lg">
            <h3 className="font-semibold mb-2">ways to contribute</h3>
            <ul className="space-y-1 text-light-secondary dark:text-[#b3b8c5]">
              <li>• report bugs and issues</li>
              <li>• suggest new features</li>
              <li>• help with documentation</li>
              <li>• contribute code improvements</li>
              <li>• share your experience</li>
            </ul>
          </div>
          <div className="p-4 bg-light-card dark:bg-[#18181b] rounded-lg">
            <h3 className="font-semibold mb-2">community guidelines</h3>
            <ul className="space-y-1 text-light-secondary dark:text-[#b3b8c5]">
              <li>• be respectful and inclusive</li>
              <li>• help others when you can</li>
              <li>• follow the code of conduct</li>
              <li>• provide constructive feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  changelog: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">changelog</h2>
      <div className="space-y-4 text-sm leading-relaxed">
        <div className="space-y-4">
          <div className="p-4 bg-light-card dark:bg-[#18181b] rounded-lg">
            <h3 className="font-semibold mb-2">v0.1.0 - initial release</h3>
            <ul className="space-y-1 text-light-secondary dark:text-[#b3b8c5]">
              <li>• basic video downloading functionality</li>
              <li>• support for multiple platforms</li>
              <li>• modern UI with dark theme</li>
              <li>• thumbnail preview feature</li>
              <li>• settings and preferences</li>
            </ul>
          </div>
          <div className="p-4 bg-light-card dark:bg-[#18181b] rounded-lg">
            <h3 className="font-semibold mb-2">upcoming features</h3>
            <ul className="space-y-1 text-light-secondary dark:text-[#b3b8c5]">
              <li>• playlist downloading</li>
              <li>• batch processing</li>
              <li>• more format options</li>
              <li>• download history</li>
              <li>• mobile app version</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('terms');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-light-background dark:bg-[#101012] text-light-foreground dark:text-[#e5e7eb] font-mono">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-light-sidebar dark:bg-[#18181b] rounded-lg border border-light-sidebar-border dark:border-[#23232a]"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* About Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative inset-y-0 left-0 w-64 bg-light-sidebar dark:bg-[#18181b] border-r border-light-sidebar-border dark:border-[#23232a] flex flex-col pt-12 px-4 z-40 transition-transform duration-300 ease-in-out`}>
        <h1 className="text-2xl font-bold mb-8 px-2">about</h1>
        <div className="flex flex-col gap-1">
          {aboutSections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-bold text-base transition-colors w-full text-left
                ${activeSection === section.id ? 'bg-pastel-blue/20 text-pastel-blue' : 'text-light-secondary dark:text-[#b3b8c5] hover:bg-pastel-blue/10 hover:text-pastel-blue'}`}
            >
              <section.icon className="w-5 h-5" />
              {section.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-12 md:pt-12 px-4 md:px-12 overflow-y-auto">
        {contentMap[activeSection as SectionId]}
      </main>
    </div>
  );
}
