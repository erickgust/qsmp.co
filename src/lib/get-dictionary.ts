import type { Locale } from "../i18n-config";
import "server-only";

// Enumeramos todos os dicionários aqui para melhor suporte a linting e typescript
// Também obtemos a importação padrão para tipos
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
  "pt-br": () =>
    import("@/dictionaries/pt-br.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
  kr: () => import("@/dictionaries/kr.json").then((module) => module.default),
};

export const langs = Object.keys(dictionaries) as Locale[];

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
