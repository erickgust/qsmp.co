"use client";

import { GermanyFlag } from "@/assets/icons/flags/de";
import { UnitedKingdomFlag } from "@/assets/icons/flags/en";
import { SpainFlag } from "@/assets/icons/flags/es";
import { FranceFlag } from "@/assets/icons/flags/fr";
import { KoreanFlag } from "@/assets/icons/flags/kr";
import { BrazilFlag } from "@/assets/icons/flags/pt-br";
import { Locale, i18n } from "@/i18n-config";
import { usePathname } from "next/navigation";
import React, { createContext, useCallback, useContext, useState } from "react";

type Language = {
  label: string;
  icon: React.ReactNode;
};

const languages = i18n.locales.map((locale) => {
  switch (locale) {
    case "de":
      return {
        label: "de",
        icon: <GermanyFlag />,
      };
    case "en":
      return {
        label: "en",
        icon: <UnitedKingdomFlag />,
      };
    case "es":
      return {
        label: "es",
        icon: <SpainFlag />,
      };
    case "fr":
      return {
        label: "fr",
        icon: <FranceFlag />,
      };
    case "pt-br":
      return {
        label: "pt-br",
        icon: <BrazilFlag />,
      };
    case "kr":
      return {
        label: "kr",
        icon: <KoreanFlag />,
      };

    default:
      return {
        label: "en",
        icon: <UnitedKingdomFlag />,
      };
  }
});

const LanguageContext = createContext<
  | {
      languages: Language[];
      selectedLanguage: string;
      selectLanguage: (language: Locale) => void;
    }
  | undefined
>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState<Locale>(() => {
    const language = pathname.split("/")[1] as Locale;

    return i18n.locales.includes(language) ? language : "en";
  });

  const selectLanguage = useCallback((language: Locale) => {
    setSelectedLanguage(language);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ languages: languages, selectedLanguage, selectLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return context;
};
