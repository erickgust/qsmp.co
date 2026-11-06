import '../globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import localFont from 'next/font/local'

import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { Toaster } from 'sonner'

import { routing } from '@/i18n/routing'
import { siteUrl } from '@/lib/site-url'

const dm_sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const pixeloidSans = localFont({
  src: [
    {
      path: '../../assets/fonts/PixeloidSans.ttf',
      weight: '400',
    },
    {
      path: '../../assets/fonts/PixeloidSans-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-pixeloid-sans',
  display: 'swap',
})

const hreflang = (locale: string) => Intl.getCanonicalLocales(locale)[0]

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('metadata')

  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((locale) => [hreflang(locale), `/${locale}/`]),
        ),
        'x-default': `/${routing.defaultLocale}/`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'QSMP',
      title: t('title'),
      description: t('description'),
      url: `/${locale}/`,
      locale: hreflang(locale).replace('-', '_'),
    },
    twitter: { card: 'summary_large_image' },
  }
}

export function generateStaticParams() {
  return routing.locales.map((lang) => ({
    lang,
  }))
}

export default async function RootLayout({ children }: LayoutProps<'/[lang]'>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={`${dm_sans.className} ${pixeloidSans.variable}`}
    >
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>

      <body>
        <NextIntlClientProvider>
          <Toaster position='top-center' />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
