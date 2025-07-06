'use client';

import { useState } from 'react';
import { ScrollText, Heart } from 'lucide-react';
import Link from 'next/link';

const aboutSections = [
  { id: 'terms', label: 'terms and ethics', icon: ScrollText },
  { id: 'licenses', label: 'thanks & licenses', icon: Heart },
];

const contentMap: { [key: string]: JSX.Element } = {
  'terms': (
    <div>
      <h2 className="text-xl font-bold mb-4">general terms <span className="text-pastel-blue">⎋</span></h2>
      <p className="mb-8 text-[#b3b8c5]">
        these terms are applicable only when using the official cobalt instance. in other cases, you may need to contact the instance hoster for accurate info.
      </p>

      <h2 className="text-xl font-bold mb-4">saving <span className="text-pastel-blue">⎋</span></h2>
      <p className="mb-4 text-[#b3b8c5]">
        saving functionality simplifies downloading content from the internet and we take zero liability for what the saved content is used for.
      </p>
      <p className="mb-4 text-[#b3b8c5]">
        processing servers operate like advanced proxies and don't ever write any requested content to disk. everything is handled in RAM and permanently purged once the tunnel is completed. we have no downloading logs and cannot identify anyone.
      </p>
      <p className="mb-8 text-[#b3b8c5]">
        you can learn more about how tunnels work in <Link href="/about" className="underline text-pastel-blue">privacy policy</Link>.
      </p>

      <h2 className="text-xl font-bold mb-4">user responsibilities <span className="text-pastel-blue">⎋</span></h2>
      <p className="mb-4 text-[#b3b8c5]">
        you (end user) are responsible for what you do with our tools, how you use and distribute resulting content. please be mindful when using content of others and always credit original creators. make sure you don't violate any terms or licenses.
      </p>
      <p className="mb-4 text-[#b3b8c5]">
        when used in educational purposes, always cite sources and credit original creators.
      </p>
      <p className="text-[#b3b8c5]">
        fair use and credits benefit everyone.
      </p>
    </div>
  ),
  'licenses': (
    <div>
      <h2 className="text-xl font-bold mb-4">acknowledgements <span className="text-pastel-blue">⎋</span></h2>
      <p className="mb-8 text-[#b3b8c5]">
        this project is heavily inspired by the fantastic work of the team at{' '}
        <a
          href="https://cobalt.tools"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-pastel-blue"
        >
          cobalt.tools
        </a>
        . their commitment to a clean, ad-free, and privacy-focused user experience set the standard.
      </p>

      <h2 className="text-xl font-bold mb-4">technology stack <span className="text-pastel-blue">⎋</span></h2>
      <p className="mb-6 text-[#b3b8c5]">
        this website was brought to life using a collection of powerful open-source technologies. we extend our gratitude to the developers and communities behind them.
      </p>
      <ul className="list-disc list-inside text-[#b3b8c5] space-y-3">
        <li>
          <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="noopener noreferrer" className="font-bold text-pastel-blue">yt-dlp</a>
          {' '}- the core command-line program that powers all video and audio downloading.
        </li>
        <li>
          <a href="https://ffmpeg.org/" target="_blank" rel="noopener noreferrer" className="font-bold text-pastel-blue">FFmpeg</a>
          {' '}- the essential toolkit for processing, converting, and merging media files.
        </li>
        <li>
          <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="font-bold text-pastel-blue">Next.js</a>
          {' '}&{' '}
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="font-bold text-pastel-blue">React</a>
          {' '}- for building a fast and modern user interface.
        </li>
        <li>
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-pastel-blue">Tailwind CSS</a>
          {' '}- for styling the application with a utility-first approach.
        </li>
        <li>
          <a href="https://zustand-demo.pmnd.rs/" target="_blank" rel="noopener noreferrer" className="font-bold text-pastel-blue">Zustand</a>
          {' '}&{' '}
          <a href="https://zod.dev/" target="_blank" rel="noopener noreferrer" className="font-bold text-pastel-blue">Zod</a>
          {' '}- for simple state management and robust data validation.
        </li>
        <li>
          <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="font-bold text-pastel-blue">Lucide</a>
          {' '}- for the clean and beautiful icons used throughout the site.
        </li>
      </ul>
    </div>
  ),
};

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('terms');

  return (
    <div className="flex min-h-screen bg-[#101012] text-[#e5e7eb] font-mono">
      {/* About Sidebar */}
      <aside className="w-64 bg-[#18181b] border-r border-[#23232a] flex flex-col pt-12 px-4">
        <h1 className="text-2xl font-bold mb-8 px-2">about</h1>
        <div className="flex flex-col gap-1">
          {aboutSections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-bold text-base transition-colors w-full text-left
                ${activeSection === section.id ? 'bg-pastel-blue/20 text-pastel-blue' : 'text-[#b3b8c5] hover:bg-pastel-blue/10 hover:text-pastel-blue'}`}
            >
              <section.icon className="w-5 h-5" />
              {section.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-12 px-12 overflow-y-auto">
        {contentMap[activeSection]}
      </main>
    </div>
  );
}
