"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Navbar } from "../navbar/navbar";

export function Header() {
  const t = useTranslations("header");
  const [isNewsletterModalOpen, setIsModalNewsletterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function toggleNewsletterModal() {
    setIsModalNewsletterOpen((open) => !open);
  }

  function toggleMenuMobile() {
    setIsMobileMenuOpen((open) => !open);
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <header className="flex flex-col h-screen supports-[height:100svh]:h-svh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 font-pixel font-bold text-[#1F1E33]"
      >
        {t("skipToContent")}
      </a>

      <div className="flex-1 relative">
        <video
          ref={videoRef}
          aria-hidden="true"
          className="w-full min-h-full max-h-0 object-cover object-center"
          loop
          muted
          src="/hero-video.m4v"
          playsInline
          poster="/header-fallback.jpg"
          preload="metadata"
        />

        <h1 className="absolute top-6 left-8 sm:top-8 sm:left-10 z-10">
          {/* 3x its 76x64 display size: the browser blurs this logo when shrinking an image only slightly larger */}
          <Image
            className="object-contain w-auto h-16"
            src="/small-qsmp-logo.png"
            alt="QSMP"
            height={192}
            width={229}
            priority
          />
        </h1>

        <Image
          className="absolute top-6 right-8 sm:top-8 sm:right-10 z-10 object-contain w-auto h-16"
          src="/square-studios-logo.png"
          alt="Quackity Studios Logo"
          height={64}
          width={64}
          priority
        />
      </div>

      <Navbar
        isMenuMobileOpen={isMobileMenuOpen}
        toggleMenuMobileModal={toggleMenuMobile}
        isNewsletterModalOpen={isNewsletterModalOpen}
        toggleNewsletterModal={toggleNewsletterModal}
      />
    </header>
  );
}
