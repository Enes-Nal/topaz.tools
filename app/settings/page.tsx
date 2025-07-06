"use client";
import { useState, useEffect } from "react";
import { Monitor, Sun, Moon, Globe2 } from "lucide-react";

const themes = [
  { label: "auto", value: "auto", icon: Monitor },
  { label: "light", value: "light", icon: Sun },
  { label: "dark", value: "dark", icon: Moon },
];

const languages = [
  { label: "english", value: "en" },
  { label: "spanish", value: "es" },
  { label: "french", value: "fr" },
  // Add more as needed
];

export default function SettingsPage() {
  const [theme, setTheme] = useState("auto");
  const [language, setLanguage] = useState("en");

  // Auto theme detection
  useEffect(() => {
    if (theme === "auto") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(mq.matches ? "dark" : "light");
      const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-[#101012] text-[#e5e7eb] font-mono">
      {/* Sidebar - remove left margin so it's flush with main sidebar */}
      <aside className="w-64 bg-[#18181b] border-r border-[#23232a] flex flex-col pt-12 px-0">
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-6 py-2 text-pastel-blue bg-[#23232a] rounded-r-2xl font-bold text-base">
            <span className="w-5 h-5 flex items-center justify-center">
              <Monitor className="w-5 h-5" />
            </span>
            appearance
          </button>
        </div>
      </aside>
      {/* Main panel */}
      <main className="flex-1 flex flex-col items-center pt-16 px-8">
        <div className="w-full max-w-xl">
          <h2 className="text-lg font-bold mb-6 tracking-wide">theme <span className="text-pastel-blue">⎋</span></h2>
          <div className="flex gap-2 mb-6">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex-1 flex flex-col items-center py-2 rounded-lg border-2 font-mono text-base transition-colors
                  ${theme === t.value ? "border-pastel-blue bg-pastel-blue/10 text-pastel-blue" : "border-[#23232a] bg-[#18181b] text-[#b3b8c5] hover:border-pastel-blue"}`}
              >
                <t.icon className="w-5 h-5 mb-1" />
                {t.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#b3b8c5] mb-8">
            auto theme switches between light and dark themes depending on your device's display mode.
          </p>
          <h2 className="text-lg font-bold mb-4 tracking-wide">language <span className="text-pastel-blue">⎋</span></h2>
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-xs text-[#b3b8c5] mb-1">preferred language</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="bg-[#23232a] border border-[#23232a] rounded-lg px-4 py-2 text-[#e5e7eb] font-mono text-base focus:border-pastel-blue focus:outline-none"
            >
              {languages.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
          <p className="text-xs text-[#b3b8c5]">
            this language will be used when automatic selection is disabled. any text that isn't translated will be displayed in english.
          </p>
        </div>
      </main>
    </div>
  );
}
