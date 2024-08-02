export const i18n = {
	defaultLocale: "en",
	locales: ["pt-br", "es", "en", "de", "fr", "kr"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
