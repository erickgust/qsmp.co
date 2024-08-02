"use client";

import { useState } from "react";

import { Navbar } from "../navbar/navbar";
import Image from "next/image";

interface HeaderProps {
  dictionary: Dictionary["nav"];
}

export function Header({ dictionary }: HeaderProps) {
  const [isNewsletterModalOpen, setIsModalNewsletterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleNewsletterModal() {
    setIsModalNewsletterOpen(!isNewsletterModalOpen);
  }

  function toggleMenuMobile() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <header className="flex flex-col h-screen supports-[height:100svh]:h-svh">
      <div className="flex-1 relative">
        <video
          className="w-full min-h-full max-h-0 object-cover object-center"
          autoPlay
          loop
          muted
          src="/hero-video.m4v"
          playsInline
          poster="/header-fallback.jpg"
          preload="metadata"
        />

        <Image
          className="absolute top-6 left-8 sm:top-8 sm:left-10 z-10 object-contain w-auto h-16"
          src="/small-qsmp-logo.png"
          alt="QSMP Logo"
          height={200}
          width={200}
          quality={100}
          priority
        />

        <Image
          className="absolute top-6 right-8 sm:top-8 sm:right-10 z-10 object-contain w-auto h-16"
          src="/square-studios-logo.png"
          alt="Quackity Studios Logo"
          height={200}
          width={200}
          quality={100}
          priority
        />
      </div>

      <Navbar
        isMenuMobileOpen={isMobileMenuOpen}
        toggleMenuMobileModal={toggleMenuMobile}
        isNewsletterModalOpen={isNewsletterModalOpen}
        toggleNewsletterModal={toggleNewsletterModal}
        dictionary={dictionary}
      />
    </header>
  );
}
