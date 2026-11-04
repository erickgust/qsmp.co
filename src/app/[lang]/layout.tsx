import '../globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import localFont from 'next/font/local'

import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { FilterProvider } from '@/context/use-filter-context'
import { ToasterProvider } from '@/providers/ToasterProvider'
import { routing } from '@/i18n/routing'
import { siteUrl } from '@/lib/site-url'
import Providers from '../providers'

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

const hreflang = (locale: string) => (locale === 'pt-br' ? 'pt-BR' : locale)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = hasLocale(routing.locales, lang) ? lang : routing.defaultLocale
  const t = await getTranslations({ locale, namespace: 'metadata' })

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(routing.locales, lang)) notFound()

  setRequestLocale(lang)

  return (
    <html
      lang={lang}
      className={`${dm_sans.className} ${pixeloidSans.variable}`}
    >
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>

      <body>
        <NextIntlClientProvider>
          <FilterProvider>
            <ToasterProvider />

            <Providers>{children}</Providers>
          </FilterProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
