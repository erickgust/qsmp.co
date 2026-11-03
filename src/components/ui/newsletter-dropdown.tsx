"use client";

import React, { useEffect, useState } from "react";
import { useTranslations, type Locale } from "next-intl";

import { useDisclosure } from "@/lib/hooks/useDisclosure";

export type Language = {
  label: string;
  icon: React.ReactNode;
  tag: Locale;
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
  const t = useTranslations("nav.newsletter-modal.dropdown");
  const { close, rootRef, buttonProps, panelProps } = useDisclosure();
  const [isSmallHeight, setIsSmallHeight] = useState(false);

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
    <div ref={rootRef} className="relative inline-block text-left w-full md:max-w-56">
      <div>
        <button
          {...buttonProps}
          className={`
          inline-flex items-center w-full p-4 border bg-white text-sm font-medium text-gray-700 ${className}`}
        >
          <span className="inline-flex items-center gap-2 w-full">
            {selectedLanguage.icon}
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="sr-only">{t("title")}: </span>
              {selectedLanguage.label}
            </span>
          </span>
          <span className="-mr-1 ml-2 mt-1">
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
          </span>
        </button>
      </div>

      <div
        {...panelProps}
        role="radiogroup"
        aria-label={t("title")}
        data-small-height={!isSmallHeight}
        className="
        data-[small-height=true]:h-28
        origin-top-right absolute bottom-0 min-[850px]:bottom-auto sm:h-fit w-full border bg-white motion-safe:animate-slide-from-top h-48 overflow-y-auto"
      >
        {languages.map((language) => (
          <label
            key={language.tag}
            // Arrow keys also fire click, with detail 0; only a real click closes
            onClick={(event) => event.detail > 0 && close()}
            className="flex items-center gap-2 py-[22px] px-6 text-sm border-b text-gray-700 hover:bg-[#F0F6FF] hover:text-gray-900 w-full cursor-pointer has-[:checked]:bg-[#F0F6FF] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2"
          >
            <input
              type="radio"
              name="newsletter-language"
              value={language.tag}
              checked={language.tag === selectedLanguage.tag}
              onChange={() => handleLanguageSelect(language)}
              className="sr-only"
            />
            {language.icon}
            <span className="whitespace-nowrap overflow-hidden text-ellipsis text-start">
              {language.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
