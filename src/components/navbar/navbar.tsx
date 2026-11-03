import Image from "next/image";

import { NewsletterIcon } from "@/assets/icons/newsletter";
import { NavbarLink } from "./navbar-link";
import { Modal } from "../ui/modal";
import { Language, NewsletterDropdown } from "../ui/newsletter-dropdown";
import clsx from "clsx";

import { Heading } from "../ui/heading";

import { NavbarLinkMobile } from "./navbar-link-mobile";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { LanguagesDropdown } from "../ui/languages-dropdown";
import { TotalCurrentViewers } from "../total-current-viewers";
import { ExternalLinkButton } from "../ui/button/external-button";

import CloseIcon from "@/assets/icons/close";
import MenuMobileIcon from "@/assets/icons/menu-mobile";
import { useEvent } from "@/context/use-is-event";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { flags } from "@/i18n/flags";
import toast from "react-hot-toast";

type NavbarProps = {
  isMenuMobileOpen: boolean;
  isNewsletterModalOpen: boolean;

  toggleMenuMobileModal: () => void;
  toggleNewsletterModal: () => void;
};

export function Navbar({
  isNewsletterModalOpen,
  toggleNewsletterModal,
  isMenuMobileOpen,
  toggleMenuMobileModal,
}: NavbarProps) {
  const { isEvent } = useEvent();
  const t = useTranslations("nav");
  const locale = useLocale();
  const menuItems = [
    { label: t("navlinks.streams"), href: "#streams" },
    { label: t("navlinks.members"), href: "#members" },
    { label: t("navlinks.updates"), href: "#updates" },
    { label: t("navlinks.socials"), href: "#socials" },
  ];

  // Intl already knows every language name in every locale; CLDR lowercases most of them ("inglés")
  const languageNames = new Intl.DisplayNames([locale], { type: "language" });
  const languages: Language[] = routing.locales.map((tag) => {
    const Flag = flags[tag];
    const name = languageNames.of(tag === "pt-br" ? "pt" : tag) ?? tag;

    return {
      label: name.charAt(0).toLocaleUpperCase(locale) + name.slice(1),
      icon: <Flag className="min-w-fit" />,
      tag,
    };
  });

  const [navHeight, setNavHeight] = useState(80);
  const [isSticky, setIsSticky] = useState(false);
  const [showTotalViewers, setShowTotalViewers] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  const [email, setEmail] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    () => languages.find((language) => language.tag === locale) ?? languages[0],
  );

  const totalViewers = 24_056;

  const handleLanguageSelect = useCallback((language: Language) => {
    setSelectedLanguage(language);
  }, []);

  // The newsletter API was removed for the portfolio version, so submitting only explains that
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast(t("newsletter-modal.demo"));
    setEmail("");
    toggleNewsletterModal();
  };

  useEffect(() => {
    const nav = navRef.current;

    if (!nav || !nav.previousElementSibling) return;

    const { previousElementSibling: prevSibling } = nav;
    const { height: siblingHeight } = prevSibling.getBoundingClientRect();

    const handleScroll = () => {
      if (window.scrollY >= siblingHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  useEffect(() => {
    if (isMenuMobileOpen || isNewsletterModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuMobileOpen, isNewsletterModalOpen]);

  useLayoutEffect(() => {
    function handleResize() {
      if (!navRef.current) return;

      setNavHeight(navRef.current.getBoundingClientRect().height);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    const nav = navRef.current;

    if (!nav || !nav.previousElementSibling) return;

    const { previousElementSibling: prevSibling } = nav;
    const { height: siblingHeight } = prevSibling.getBoundingClientRect();

    const handleViewerScroll = () => {
      currentScrollPosition = window.scrollY;

      if (currentScrollPosition <= siblingHeight) return;

      if (previousScrollPosition < currentScrollPosition) {
        setShowTotalViewers(false);
      } else {
        setShowTotalViewers(true);
      }

      previousScrollPosition = currentScrollPosition;
    };

    window.addEventListener("scroll", handleViewerScroll);

    return () => {
      window.removeEventListener("scroll", handleViewerScroll);
    };
  }, []);

  return (
    <>
      <nav
        data-sticky={isSticky}
        className="
        bg-white flex flex-col items-center relative
        justify-between border-y w-full transition-all
        data-[sticky=true]:fixed data-[sticky=true]:z-20 data-[sticky=true]:top-0
      "
        ref={navRef}
      >
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center min-[900px]:border-r-0">
            <div className="border-r py-1 min-w-max">
              <Image
                src="/small-qsmp-logo.png"
                alt="QSMP Logo"
                width={100}
                height={100}
                className="my-3 mx-4 xl:mx-8 h-12 w-auto"
              />
            </div>

            {totalViewers > 0 && (
              <div className="hidden items-center gap-2 border-r h-20 px-8 text-[#1F1E33] xl:flex max-2xl:max-w-xs w-full">
                <TotalCurrentViewers
                  loading={false}
                  totalViewers={totalViewers}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleMenuMobileModal}
            className="flex min-[900px]:hidden items-center px-9 py-7 border-l border-r-0 "
          >
            <MenuMobileIcon className="size-6" />
          </button>

          <div className="hidden items-center min-[900px]:flex">
            <div className=" flex items-center border-l border-r h-20 px-8 2xl:px-10">
              {menuItems.map((link) => (
                <NavbarLink
                  href={link.href}
                  key={link.label}
                  label={link.label}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={toggleNewsletterModal}
              className="text-xs hover:bg-[#F0F6FF] uppercase border-r px-6 2xl:px-10 h-20 flex items-center gap-2 text-[#1F1E33]"
            >
              <NewsletterIcon />

              {t("newsletter")}
            </button>

            <LanguagesDropdown />
          </div>

          <Modal
            isOpen={isNewsletterModalOpen}
            toggleModal={toggleNewsletterModal}
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <Heading className="text-2xl">
                  {t("newsletter-modal.title")}
                </Heading>

                <button
                  type="button"
                  onClick={toggleNewsletterModal}
                  className="md:absolute md:right-8 md:top-8 pl-2 ml-1"
                >
                  <CloseIcon className="size-6" />
                </button>
              </div>

              <p className="mb-6 text-pretty">
                {t("newsletter-modal.paragraph.first")}

                <span className="inline-block mt-2">
                  {t("newsletter-modal.paragraph.second")}
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <NewsletterDropdown
                  selectedLanguage={selectedLanguage}
                  handleLanguageSelect={handleLanguageSelect}
                  className="justify-between md:justify-center"
                  languages={languages}
                />

                <input
                  type="email"
                  required
                  className="border w-full p-4"
                  placeholder={t("newsletter-modal.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <ExternalLinkButton
                colors="blue"
                className="mt-6 self-end"
                as="button"
                type="submit"
              >
                {t("newsletter-modal.button")}
              </ExternalLinkButton>
            </form>
          </Modal>

          {/* Mobile menu */}

          <div
            className={`${
              isMenuMobileOpen ? "fixed min-[900px]:hidden" : "hidden"
            } inset-0 w-screen h-screen supports-[height:100dvh]:h-dvh z-50 flex items-center justify-center bg-neutral-900/70 transition-all `}
          >
            <div className="relative bg-[#ffffff] w-screen h-full shadow-lg">
              <div className="flex justify-between items-center border">
                <div className="border-r py-1">
                  <Image
                    src="/small-qsmp-logo.png"
                    alt="QSMP Logo"
                    width={100}
                    height={100}
                    className="my-3 mx-4 xl:mx-8 h-12 w-auto"
                  />
                </div>

                <button
                  type="button"
                  onClick={toggleMenuMobileModal}
                  className="items-center px-9 py-7 border-l border-r-0"
                >
                  <CloseIcon className="size-6" />
                </button>
              </div>

              <div className="flex flex-col justify-between h-[calc(100%-82px)] overflow-y-auto">
                <div className="flex flex-col">
                  {menuItems.map((link) => (
                    <NavbarLinkMobile
                      href={link.href}
                      key={link.label}
                      label={link.label}
                      arrowColor="#1F1E33"
                      toggleMenuMobileModal={toggleMenuMobileModal}
                    />
                  ))}
                </div>

                <div className="flex flex-col border-b">
                  <button
                    type="button"
                    onClick={() => {
                      toggleMenuMobileModal();
                      toggleNewsletterModal();
                    }}
                    className="text-xl hover:bg-[#F0F6FF] uppercase px-8 h-20 w-full flex items-center gap-2 text-[#1F1E33]"
                  >
                    <NewsletterIcon className="size-6" />
                    {t("newsletter")}
                  </button>

                  <LanguagesDropdown />
                </div>
              </div>
            </div>
          </div>
        </div>

        {totalViewers > 0 && (
          <div
            className={clsx(
              "flex items-center w-full justify-center h-20 text-[#1F1E33] xl:hidden transition-all absolute translate-y-full top-0 bg-white z-20 border-y",
              showTotalViewers ? "flex" : "hidden",
            )}
          >
            <TotalCurrentViewers
              loading={false}
              totalViewers={totalViewers}
            />
          </div>
        )}
      </nav>

      {isSticky ? <div style={{ height: navHeight }} /> : null}
    </>
  );
}
