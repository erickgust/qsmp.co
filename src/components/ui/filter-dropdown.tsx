import { ArrowUp } from "@/assets/icons/arrow-up";
import { useFilter } from "@/context/use-filter-context";
import React, { useState } from "react";

interface FilterDropdownProps {
  dictionary: Dictionary["members"];
}

export function FilterDropdown({ dictionary }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { languages, selectedLanguages, toggleLanguage } = useFilter();

  return (
    <div className="relative inline-block text-left w-full md:w-auto min-w-[250px]">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center justify-between gap-7 w-full px-6 py-4 bg-[#F0F6FF] border border-[#D7DFEC] font-medium text-[#1F1E33] text-lg"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-between w-full gap-2">
            {selectedLanguages.length > 0 ? (
              selectedLanguages.join(", ")
            ) : (
              <p className="text-lg">
                {dictionary.filter}
              </p>
            )}

            <ArrowUp
              data-open={isOpen}
              className="size-6 rotate-180 data-[open=true]:rotate-0"
            />
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute z-10 right-0 w-full bg-[#F0F6FF] ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {languages.map((language, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-4 border border-[#D7DFEC] animate-slide-from-top w-full cursor-pointer"
              onClick={() => toggleLanguage(language.label)}
              onChange={() => toggleLanguage(language.label)}
            >
              <input
                type="checkbox"
                checked={selectedLanguages.includes(language.label)}
                onChange={() => toggleLanguage(language.label)}
                className="form-checkbox size-5 text-blue-600 cursor-pointer css-checkbox"
                id="terms"
              />

              <span>{language.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
