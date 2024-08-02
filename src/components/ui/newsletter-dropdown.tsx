"use client";

import React, { useCallback, useEffect, useState } from "react";

export type Language = {
  label: string;
  icon: React.ReactNode;
  tag: "en" | "pt" | "es" | "fr" | "de" | "kr";
};

type NewsletterDropdownProps = {
  className?: string;

  languages: readonly Language[];
  selectedLanguage: Language;
  handleLanguageSelect: (language: Language) => void;
};

export function NewsletterDropdown({
  className,
  languages,
  handleLanguageSelect,
  selectedLanguage,
}: NewsletterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallHeight, setIsSmallHeight] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight > 805) {
        setIsSmallHeight(true);
      } else {
        setIsSmallHeight(false);
      }
    };

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="relative inline-block text-left w-full md:max-w-56">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
          inline-flex items-center w-full p-4 border bg-white text-sm font-medium text-gray-700 ${className}`}
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="inline-flex items-center gap-2 w-full">
            {selectedLanguage.icon}
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {selectedLanguage.label}
            </span>
          </div>
          <div className="-mr-1 ml-2 mt-1">
            <svg
              className="size-5 min-w-fit"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 9.293l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L10 9.293z"
              />
            </svg>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          data-small-height={!isSmallHeight}
          className="
        data-[small-height=true]:h-28
        origin-top-right absolute bottom-0 min-[850px]:bottom-auto sm:h-fit w-full border bg-white animate-slide-from-top h-48 overflow-y-auto"
        >
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            title="Select a language"
          >
            {languages.map((language) => (
              <button
                key={language.label}
                onClick={() => {
                  handleLanguageSelect(language);
                  handleCloseModal();
                }}
                className="flex items-center gap-2 py-[22px] px-6 text-sm border-b text-gray-700 hover:bg-[#F0F6FF] hover:text-gray-900 w-full"
                role="menuitem"
                type="button"
              >
                {language.icon}
                <span className="whitespace-nowrap overflow-hidden text-ellipsis text-start">
                  {language.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
