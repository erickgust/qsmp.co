import Image from 'next/image'

import { NewsletterIcon } from '@/assets/icons/newsletter'
import { NavbarLink } from './navbar-link'
import { Modal } from '../ui/modal'
import { Language, NewsletterDropdown } from '../ui/newsletter-dropdown'
import clsx from 'clsx'

import { Heading } from '../ui/heading'

import { NavbarLinkMobile } from './navbar-link-mobile'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { LanguagesDropdown } from '../ui/languages-dropdown'
import { TotalCurrentViewers } from '../total-current-viewers'
import { ExternalLinkButton } from '../ui/button/external-button'

import CloseIcon from '@/assets/icons/close'
import MenuMobileIcon from '@/assets/icons/menu-mobile'
import { useLocale, useTranslations } from 'next-intl'
import { routing } from '@/i18n/routing'
import { flags } from '@/i18n/flags'
import toast from 'react-hot-toast'

type NavbarProps = {
  isMenuMobileOpen: boolean
  isNewsletterModalOpen: boolean

  toggleMenuMobileModal: () => void
  toggleNewsletterModal: () => void
}

export function Navbar({
  isNewsletterModalOpen,
  toggleNewsletterModal,
  isMenuMobileOpen,
  toggleMenuMobileModal,
}: NavbarProps) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const menuItems = [
    { label: t('navlinks.streams'), href: '#streams' },
    { label: t('navlinks.members'), href: '#members' },
    { label: t('navlinks.updates'), href: '#updates' },
    { label: t('navlinks.socials'), href: '#socials' },
  ]

  // CLDR lowercases most language names ("inglés")
  const languageNames = new Intl.DisplayNames([locale], { type: 'language' })
  const languages: Language[] = routing.locales.map((tag) => {
    const Flag = flags[tag]
    const name = languageNames.of(tag === 'pt-br' ? 'pt' : tag) ?? tag

    return {
      label: name.charAt(0).toLocaleUpperCase(locale) + name.slice(1),
      icon: <Flag className='min-w-fit' aria-hidden='true' />,
      tag,
    }
  })

  const [navHeight, setNavHeight] = useState(80)
  const [isSticky, setIsSticky] = useState(false)
  const [showTotalViewers, setShowTotalViewers] = useState(true)
  const navRef = useRef<HTMLElement>(null)
  const previousScrollPosition = useRef(0)

  const [email, setEmail] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    () => languages.find((language) => language.tag === locale) ?? languages[0],
  )

  const totalViewers = 24_056

  const handleLanguageSelect = useCallback((language: Language) => {
    setSelectedLanguage(language)
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast(t('newsletter-modal.demo'))
    setEmail('')
    toggleNewsletterModal()
  }

  useEffect(() => {
    const nav = navRef.current

    if (!nav || !nav.previousElementSibling) return

    const { previousElementSibling: prevSibling } = nav
    const { height: siblingHeight } = prevSibling.getBoundingClientRect()

    const handleScroll = () => {
      if (window.scrollY >= siblingHeight) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isSticky])

  useEffect(() => {
    if (isMenuMobileOpen || isNewsletterModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuMobileOpen, isNewsletterModalOpen])

  useLayoutEffect(() => {
    function handleResize() {
      if (!navRef.current) return

      setNavHeight(navRef.current.getBoundingClientRect().height)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const nav = navRef.current

    if (!nav || !nav.previousElementSibling) return

    const { previousElementSibling: prevSibling } = nav
    const { height: siblingHeight } = prevSibling.getBoundingClientRect()

    const handleViewerScroll = () => {
      const currentScrollPosition = window.scrollY

      if (currentScrollPosition <= siblingHeight) return

      if (previousScrollPosition.current < currentScrollPosition) {
        setShowTotalViewers(false)
      } else {
        setShowTotalViewers(true)
      }

      previousScrollPosition.current = currentScrollPosition
    }

    window.addEventListener('scroll', handleViewerScroll)

    return () => {
      window.removeEventListener('scroll', handleViewerScroll)
    }
  }, [])

  return (
    <>
      <nav
        data-sticky={isSticky}
        className='
        bg-white flex flex-col items-center relative
        justify-between border-y w-full
        data-[sticky=true]:fixed data-[sticky=true]:z-20 data-[sticky=true]:top-0
      '
        ref={navRef}
      >
        <div className='flex items-center justify-between w-full '>
          <div className='flex items-center min-[900px]:border-r-0'>
            <div className='border-r py-1 min-w-max'>
              <Image
                src='/small-qsmp-logo.png'
                alt='QSMP Logo'
                // 3x the display size, see header.tsx
                width={172}
                height={144}
                className='my-3 mx-4 xl:mx-8 h-12 w-auto'
              />
            </div>

            {totalViewers > 0 && (
              <div className='hidden items-center gap-2 border-r h-20 px-8 text-[#1F1E33] xl:flex max-2xl:max-w-xs w-full'>
                <TotalCurrentViewers totalViewers={totalViewers} />
              </div>
            )}
          </div>

          <button
            type='button'
            onClick={toggleMenuMobileModal}
            aria-label={t('openMenu')}
            aria-haspopup='dialog'
            aria-expanded={isMenuMobileOpen}
            className='flex min-[900px]:hidden items-center px-9 py-7 border-l border-r-0 '
          >
            <MenuMobileIcon className='size-6' aria-hidden='true' />
          </button>

          <div className='hidden items-center min-[900px]:flex'>
            <div className=' flex items-center border-l border-r h-20 px-8 2xl:px-10'>
              {menuItems.map((link) => (
                <NavbarLink
                  href={link.href}
                  key={link.label}
                  label={link.label}
                />
              ))}
            </div>

            <button
              type='button'
              onClick={toggleNewsletterModal}
              className='text-xs hover:bg-[#F0F6FF] uppercase border-r px-6 2xl:px-10 h-20 flex items-center gap-2 text-[#1F1E33]'
            >
              <NewsletterIcon aria-hidden='true' />

              {t('newsletter')}
            </button>

            <LanguagesDropdown />
          </div>

          <Modal
            isOpen={isNewsletterModalOpen}
            toggleModal={toggleNewsletterModal}
            aria-labelledby='newsletter-title'
            className='dialog-pop md:max-w-4xl bg-white shadow-lg w-10/12'
          >
            <div className='relative p-8 md:px-16 md:py-14'>
              <div className='flex flex-col gap-6'>
                <div className='flex justify-between items-start'>
                  <Heading id='newsletter-title' className='text-2xl'>
                    {t('newsletter-modal.title')}
                  </Heading>

                  <button
                    type='button'
                    onClick={toggleNewsletterModal}
                    aria-label={t('close')}
                    className='md:absolute md:right-8 md:top-8 pl-2 ml-1'
                  >
                    <CloseIcon className='size-6' aria-hidden='true' />
                  </button>
                </div>

                <p className='mb-6 text-pretty'>
                  {t('newsletter-modal.paragraph.first')}

                  <span className='inline-block mt-2'>
                    {t('newsletter-modal.paragraph.second')}
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex flex-col md:flex-row gap-6 w-full'>
                  <NewsletterDropdown
                    selectedLanguage={selectedLanguage}
                    handleLanguageSelect={handleLanguageSelect}
                    className='justify-between md:justify-center'
                    languages={languages}
                  />

                  <label htmlFor='newsletter-email' className='sr-only'>
                    {t('newsletter-modal.placeholder')}
                  </label>
                  <input
                    id='newsletter-email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='border w-full p-4'
                    placeholder={t('newsletter-modal.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <ExternalLinkButton
                  colors='blue'
                  className='mt-6 self-end'
                  as='button'
                  type='submit'
                >
                  {t('newsletter-modal.button')}
                </ExternalLinkButton>
              </form>
            </div>
          </Modal>

          {/* Mobile menu */}

          <Modal
            isOpen={isMenuMobileOpen}
            toggleModal={toggleMenuMobileModal}
            aria-label={t('menu')}
            className='m-0 w-screen max-w-none h-screen supports-[height:100dvh]:h-dvh max-h-none bg-white'
          >
            <div className='relative bg-[#ffffff] w-screen h-full shadow-lg'>
              <div className='flex justify-between items-center border'>
                <div className='border-r py-1'>
                  <Image
                    src='/small-qsmp-logo.png'
                    alt='QSMP Logo'
                    width={172}
                    height={144}
                    className='my-3 mx-4 xl:mx-8 h-12 w-auto'
                  />
                </div>

                <button
                  type='button'
                  onClick={toggleMenuMobileModal}
                  aria-label={t('closeMenu')}
                  className='items-center px-9 py-7 border-l border-r-0'
                >
                  <CloseIcon className='size-6' aria-hidden='true' />
                </button>
              </div>

              <div className='flex flex-col justify-between h-[calc(100%-82px)] overflow-y-auto'>
                <div className='flex flex-col'>
                  {menuItems.map((link) => (
                    <NavbarLinkMobile
                      href={link.href}
                      key={link.label}
                      label={link.label}
                      arrowColor='#1F1E33'
                      toggleMenuMobileModal={toggleMenuMobileModal}
                    />
                  ))}
                </div>

                <div className='flex flex-col border-b'>
                  <button
                    type='button'
                    onClick={() => {
                      toggleMenuMobileModal()
                      // Open after the menu dialog has closed and handed focus back
                      requestAnimationFrame(toggleNewsletterModal)
                    }}
                    className='text-xl hover:bg-[#F0F6FF] uppercase px-8 h-20 w-full flex items-center gap-2 text-[#1F1E33]'
                  >
                    <NewsletterIcon className='size-6' aria-hidden='true' />
                    {t('newsletter')}
                  </button>

                  <LanguagesDropdown />
                </div>
              </div>
            </div>
          </Modal>
        </div>

        {totalViewers > 0 && (
          <div className='absolute top-full inset-x-0 z-20 overflow-hidden pointer-events-none xl:hidden'>
            <div
              className={clsx(
                'flex items-center justify-center h-20 text-[#1F1E33] bg-white border-y',
                'transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]',
                'motion-reduce:transition-opacity motion-reduce:translate-y-0',
                showTotalViewers
                  ? 'translate-y-0'
                  : '-translate-y-full motion-reduce:opacity-0',
              )}
            >
              <TotalCurrentViewers totalViewers={totalViewers} />
            </div>
          </div>
        )}
      </nav>

      {isSticky ? <div style={{ height: navHeight }} /> : null}
    </>
  )
}
