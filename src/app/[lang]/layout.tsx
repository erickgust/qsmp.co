import "../globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";

import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { FilterProvider } from "@/context/use-filter-context";
import { ToasterProvider } from "@/providers/ToasterProvider";
import { routing } from "@/i18n/routing";
import Providers from "../providers";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const pixeloidSans = localFont({
  src: [
    {
      path: "../../assets/fonts/PixeloidSans.ttf",
      weight: "400",
    },
    {
      path: "../../assets/fonts/PixeloidSans-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-pixeloid-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QSMP - The World's First Multilingual Minecraft server by Quackity",
  description:
    "Welcome to the QSMP, the world's first multilingual Minecraft server created by Quackity featuring real-time live translation. The QSMP unites one of the biggest international and global communities ever created by a Minecraft server. Watch the QSMP to engage with players from around the world in an unprecedented, multilingual gaming adventure.",
};

export function generateStaticParams() {
  return routing.locales.map((lang) => ({
    lang,
  }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  if (!hasLocale(routing.locales, params.lang)) notFound();

  setRequestLocale(params.lang);

  return (
    <html
      lang={params.lang}
      className={`${dm_sans.className} ${pixeloidSans.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
  );
}
