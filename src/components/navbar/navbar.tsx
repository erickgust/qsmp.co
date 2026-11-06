import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { NewsletterIcon } from '@/assets/icons/newsletter'
import CloseIcon from '@/assets/icons/close'
import MenuMobileIcon from '@/assets/icons/menu-mobile'
import { Modal } from '../ui/modal'
import { NavbarLink } from './navbar-link'
import { NavbarLinkMobile } from './navbar-link-mobile'
import { LanguagesDropdown } from './languages-dropdown'
import { TotalCurrentViewers } from './total-current-viewers'
import { NewsletterModal } from './newsletter-modal'

const totalViewers = 24_056

export function Navbar() {
  const t = useTranslations('nav')
  const menuItems = [
    { label: t('navlinks.streams'), href: '#streams' },
    { label: t('navlinks.members'), href: '#members' },
    { label: t('navlinks.updates'), href: '#updates' },
    { label: t('navlinks.socials'), href: '#socials' },
  ]

  const [openDialog, setOpenDialog] = useState<'menu' | 'newsletter' | null>(
    null,
  )
  const closeDialog = () => setOpenDialog(null)

  const [navHeight, setNavHeight] = useState(80)
  const [isSticky, setIsSticky] = useState(false)
  const [showTotalViewers, setShowTotalViewers] = useState(true)
  const navRef = useRef<HTMLElement>(null)
  const navTopRef = useRef<HTMLDivElement>(null)
  const previousScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const isPastNavTop = navTopRef.current!.getBoundingClientRect().top <= 0
      setIsSticky(isPastNavTop)

      if (!isPastNavTop) return
      setShowTotalViewers(scrollY <= previousScrollY.current)
      previousScrollY.current = scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <>
      <div ref={navTopRef} />

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
              <NavLogo />
            </div>

            {totalViewers > 0 && (
              <div className='hidden items-center gap-2 border-r h-20 px-8 text-[#1F1E33] xl:flex max-2xl:max-w-xs w-full'>
                <TotalCurrentViewers totalViewers={totalViewers} />
              </div>
            )}
          </div>

          <button
            type='button'
            onClick={() => setOpenDialog('menu')}
            aria-label={t('openMenu')}
            aria-haspopup='dialog'
            aria-expanded={openDialog === 'menu'}
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
              onClick={() => setOpenDialog('newsletter')}
              className='text-xs hover:bg-[#F0F6FF] uppercase border-r px-6 2xl:px-10 h-20 flex items-center gap-2 text-[#1F1E33]'
            >
              <NewsletterIcon aria-hidden='true' />

              {t('newsletter')}
            </button>

            <LanguagesDropdown />
          </div>

          <NewsletterModal
            isOpen={openDialog === 'newsletter'}
            onClose={closeDialog}
          />

          <Modal
            isOpen={openDialog === 'menu'}
            onClose={closeDialog}
            aria-label={t('menu')}
            className='m-0 w-screen max-w-none h-screen supports-[height:100dvh]:h-dvh max-h-none bg-white'
          >
            <div className='relative bg-[#ffffff] w-screen h-full shadow-lg'>
              <div className='flex justify-between items-center border'>
                <div className='border-r py-1'>
                  <NavLogo />
                </div>

                <button
                  type='button'
                  onClick={closeDialog}
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
                      onClick={closeDialog}
                    />
                  ))}
                </div>

                <div className='flex flex-col border-b'>
                  <button
                    type='button'
                    onClick={() => {
                      closeDialog()
                      // Open after the menu dialog has closed and handed focus back
                      requestAnimationFrame(() => setOpenDialog('newsletter'))
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

function NavLogo() {
  return (
    <Image
      src='/small-qsmp-logo.png'
      alt='QSMP Logo'
      // 3x the display size: the browser blurs this logo when shrinking an image only slightly larger
      width={172}
      height={144}
      className='my-3 mx-4 xl:mx-8 h-12 w-auto'
    />
  )
}
