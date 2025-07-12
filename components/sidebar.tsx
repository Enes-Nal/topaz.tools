'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Settings, Info, Image } from 'lucide-react';

const navTop = [
  { label: 'save', href: '/', icon: Download },
  { label: 'thumbnail', href: '/thumbnail', icon: Image },
];

const navBottom = [
  { label: 'settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const isAboutActive = pathname === '/about';
  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-light-sidebar dark:bg-[#18181b] border-r border-light-sidebar-border dark:border-[#23232a] flex flex-col justify-between items-center py-6 z-40">
      {/* Top nav: only save */}
      <nav className="flex flex-col gap-8 items-center mt-2">
        {navTop.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2 py-2 w-16 rounded-lg transition-colors font-mono text-xs lowercase
                ${isActive ? 'bg-pastel-blue/20 text-pastel-blue' : 'text-light-secondary dark:text-[#b3b8c5] hover:text-pastel-blue'}`}
              style={{ textTransform: 'none', letterSpacing: 0 }}
              scroll={false}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {/* Bottom nav: settings and about */}
      <div className="flex flex-col items-center gap-4 mb-4 w-full">
        {navBottom.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2 py-2 w-16 rounded-lg transition-colors font-mono text-xs lowercase
                ${isActive ? 'bg-pastel-blue/20 text-pastel-blue' : 'text-light-secondary dark:text-[#b3b8c5] hover:text-pastel-blue'}`}
              style={{ textTransform: 'none', letterSpacing: 0 }}
              scroll={false}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        {/* About button in a rounded container */}
        <Link
          href="/about"
          className={`mt-4 mb-2 flex flex-col items-center rounded-2xl px-4 py-3 w-16 shadow transition-colors font-mono text-xs lowercase
            ${isAboutActive ? 'bg-pastel-blue text-light-background dark:text-background' : 'bg-light-input dark:bg-[#23232a] text-light-secondary dark:text-[#b3b8c5] hover:text-pastel-blue'}`}
          scroll={false}
        >
          <Info className="w-6 h-6 mb-1" />
          <span>about</span>
        </Link>
      </div>
    </aside>
  );
}
