import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-br", "es", "en", "de", "fr", "ko"],
  defaultLocale: "en",
});
