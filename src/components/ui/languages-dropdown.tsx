"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";

import { ArrowUp } from "@/assets/icons/arrow-up";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { flags } from "@/i18n/flags";

export function LanguagesDropdown() {
  const selectedLanguage = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const SelectedFlag = flags[selectedLanguage];

  return (
    <div className="relative inline-block text-left">
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
          <SelectedFlag width={24} height={18} />

          <p className="text-xl min-[900px]:text-xs uppercase">
            {selectedLanguage}
          </p>
        </span>

        <ArrowUp
          data-open={isOpen}
          className="data-[open=true]:rotate-180 min-[900px]:rotate-180 min-[900px]:data-[open=true]:rotate-0 size-6 min-[900px]:size-[1.125rem] 2xl:size-5"
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute bottom-0 min-[850px]:bottom-auto w-full border bg-white animate-slide-from-top z-30 text-xl min-[900px]:text-xs">
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {routing.locales.map((locale) => {
              const Flag = flags[locale];

              return (
                <Link
                  key={locale}
                  onClick={() => setIsOpen(false)}
                  href={pathname}
                  locale={locale}
                  className="flex items-center gap-2 py-8 px-7 text-xl min-[900px]:text-xs border-b text-gray-700 hover:bg-[#F0F6FF] hover:text-gray-900 w-full"
                  role="menuitem"
                >
                  <Flag width={24} height={18} />

                  <span className="uppercase">{locale}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
