"use client";

import React, { createContext, useContext, useState } from "react";

import { members } from "@/components/member-section/members";

type Language = {
  label: string;
};

const languages: Language[] = Array.from(
  new Set(members.flatMap((member) => member.languages)),
  (label) => ({ label }),
);

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
    setSelectedLanguages((selected) =>
      selected.includes(label)
        ? selected.filter((lang) => lang !== label)
        : [...selected, label],
    );
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
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
