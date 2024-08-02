"use client";

import React, { useCallback, useState } from "react";
import { ArrowUp } from "@/assets/icons/arrow-up";
import { useLanguage } from "@/context/use-language-context";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export function LanguagesDropdown() {
  const { languages, selectedLanguage, selectLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleLanguageSelect = useCallback(
    (language: string) => {
      selectLanguage(language as Locale);
      setIsOpen(false);

      cookies.set("language", language, {
        path: "/",
      });
    },

    [selectLanguage]
  );

  const redirectedPathName = useCallback(
    (locale: string) => {
      if (!pathname) return "/";

      const segments = pathname.split("/");
      segments[1] = locale;

      return segments.join("/");
    },
    [pathname]
  );

  return (
    <div className="relative inline-block text-left md:font-bold">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          inline-flex items-center justify-between px-8 min-[900px]:px-6 h-20
          bg-white hover:bg-[#F0F6FF] text-[#1F1E33]
          w-full min-[900px]:w-36 2xl:w-40
        "
        id="options-menu"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {
            languages.find((language) => language.label === selectedLanguage)
              ?.icon
          }

          <p className="text-xl min-[900px]:text-xs 2xl:text-sm uppercase">
            {selectedLanguage}
          </p>
        </span>

        <ArrowUp
          data-open={isOpen}
          className="data-[open=true]:rotate-180 min-[900px]:rotate-180 min-[900px]:data-[open=true]:rotate-0 size-6 min-[900px]:size-[1.125rem] 2xl:size-5"
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute bottom-0 min-[850px]:bottom-auto w-full border bg-white animate-slide-from-top z-30 text-xl min-[900px]:text-xs 2xl:text-sm">
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {languages.map((language) => (
              <Link
                key={language.label}
                onClick={() => handleLanguageSelect(language.label)}
                href={redirectedPathName(language.label)}
                className="flex items-center gap-2 py-8 px-7 text-xl min-[900px]:text-xs 2xl:text-sm border-b text-gray-700 hover:bg-[#F0F6FF] hover:text-gray-900 w-full"
                role="menuitem"
              >
                {language.icon}

                <span className="uppercase">{language.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
