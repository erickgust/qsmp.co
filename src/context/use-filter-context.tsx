"use client";

import React, { createContext, useContext, useState } from "react";

type Language = {
  label: string;
};

const languages: Language[] = [
  { label: "ES" },
  { label: "DE" },
  { label: "PT-BR" },
  { label: "FR" },
  { label: "EN" },
  { label: "KR" },
];

const FilterContext = createContext<
  | {
      languages: Language[];
      toggleLanguage: (label: string) => void;

      selectedLanguages: string[];
      setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
    }
  | undefined
>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const toggleLanguage = (label: string) => {
    if (selectedLanguages.includes(label)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== label));
    } else {
      setSelectedLanguages([...selectedLanguages, label]);
    }
  };

  return (
    <FilterContext.Provider
      value={{
        selectedLanguages,
        setSelectedLanguages,
        toggleLanguage,
        languages,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useFilter deve ser usado dentro de um FilterProvider");
  }
  return context;
};
