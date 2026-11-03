"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";

import { ArrowUp } from "@/assets/icons/arrow-up";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { flags } from "@/i18n/flags";
import { useDisclosure } from "@/lib/hooks/useDisclosure";

const nativeName = (locale: string) =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale === "pt-br" ? "pt-BR" : locale);

export function LanguagesDropdown() {
  const t = useTranslations("nav");
  const selectedLanguage = useLocale();
  const { isOpen, close, rootRef, buttonProps, panelProps } = useDisclosure();

  const pathname = usePathname();
  const SelectedFlag = flags[selectedLanguage];

  return (
    <div ref={rootRef} className="relative inline-block text-left">
      <button
        {...buttonProps}
        className="
          inline-flex items-center justify-between px-8 min-[900px]:px-6 h-20
          bg-white hover:bg-[#F0F6FF] text-[#1F1E33]
          w-full min-[900px]:w-36 2xl:w-40
        "
      >
        <span className="flex items-center gap-2">
          <SelectedFlag width={24} height={18} aria-hidden="true" />

          <span className="text-xl min-[900px]:text-xs uppercase">
            <span className="sr-only">{t("language")}: </span>
            {selectedLanguage}
          </span>
        </span>

        <ArrowUp
          aria-hidden="true"
          data-open={isOpen}
          className="data-[open=true]:rotate-180 min-[900px]:rotate-180 min-[900px]:data-[open=true]:rotate-0 size-6 min-[900px]:size-[1.125rem] 2xl:size-5"
        />
      </button>

      <ul
        {...panelProps}
        className="origin-top-right absolute bottom-0 min-[850px]:bottom-auto w-full border bg-white motion-safe:animate-slide-from-top z-30 text-xl min-[900px]:text-xs"
      >
        {routing.locales.map((locale) => {
          const Flag = flags[locale];

          return (
            <li key={locale}>
              <Link
                onClick={close}
                href={pathname}
                locale={locale}
                hrefLang={locale}
                aria-current={locale === selectedLanguage ? "true" : undefined}
                className="flex items-center gap-2 py-8 px-7 text-xl min-[900px]:text-xs border-b text-gray-700 hover:bg-[#F0F6FF] hover:text-gray-900 w-full"
              >
                <Flag width={24} height={18} aria-hidden="true" />

                <span className="uppercase">{locale}</span>
                <span className="sr-only" lang={locale}>
                  {nativeName(locale)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
