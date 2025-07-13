'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Settings, Info, Image } from 'lucide-react';
import { useTranslation } from './language-provider';

const navItems = [
  { label: 'save', href: '/', icon: Download },
  { label: 'thumbnail', href: '/thumbnail', icon: Image },
  { label: 'settings', href: '/settings', icon: Settings },
  { label: 'about', href: '/about', icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-light-sidebar dark:bg-[#18181b] border-r border-light-sidebar-border dark:border-[#23232a] flex-col justify-between items-center py-6 z-40">
        {/* Top nav: save and thumbnail */}
        <nav className="flex flex-col gap-8 items-center mt-2">
          {navItems.slice(0, 2).map((item) => {
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
                <span>{t(item.label)}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom nav: settings and about */}
        <div className="flex flex-col items-center gap-4 mb-4 w-full">
          {navItems.slice(2, 3).map((item) => {
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
                <span>{t(item.label)}</span>
              </Link>
            );
          })}
          {/* About button in a rounded container */}
          <Link
            href="/about"
            className={`mt-4 mb-2 flex flex-col items-center rounded-2xl px-4 py-3 w-16 shadow transition-colors font-mono text-xs lowercase
              ${pathname === '/about' ? 'bg-pastel-blue text-light-background dark:text-background' : 'bg-light-input dark:bg-[#23232a] text-light-secondary dark:text-[#b3b8c5] hover:text-pastel-blue'}`}
            scroll={false}
          >
            <Info className="w-6 h-6 mb-1" />
            <span>{t('about')}</span>
          </Link>
        </div>
      </aside>

      {/* Mobile/Tablet Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-light-sidebar dark:bg-[#18181b] border-t border-light-sidebar-border dark:border-[#23232a] z-40">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors font-mono text-xs lowercase min-w-0 flex-1
                  ${isActive ? 'bg-pastel-blue/20 text-pastel-blue' : 'text-light-secondary dark:text-[#b3b8c5] hover:text-pastel-blue'}`}
                style={{ textTransform: 'none', letterSpacing: 0 }}
                scroll={false}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="truncate">{t(item.label)}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
