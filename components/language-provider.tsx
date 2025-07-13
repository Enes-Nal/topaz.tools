"use client";
import React, { createContext, useContext } from "react";
import { useLanguageStore } from "@/lib/language-store";
import { getTranslations } from "@/lib/translations";

interface LanguageContextProps {
  language: string;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguageStore();
  const translations = getTranslations(language);
  const t = (key: string) => translations[key] || key;

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
