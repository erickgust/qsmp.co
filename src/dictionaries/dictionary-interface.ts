interface Dictionary {
  nav: {
    navlinks: {
      streams: string;
      members: string;
      updates: string;
      socials: string;
      shop: string;
    };
    counter: string;
    newsletter: string;
    "newsletter-modal": {
      title: string;
      paragraph: {
        first: string;
        second: string;
      };
      dropdown: {
        title: string;
        en: string;
        es: string;
        de: string;
        fr: string;
        pt: string;
        kr: string;
      };
      button: string;
      placeholder: string;
    };
  };
  stream: {
    title: string;
    eventTitle: string;
    live: string;
    paragraph: {
      first: string;
    };
    button: {
      twitch: string;
      youtube: string;
    };
  };
  members: {
    title: string;
    filter: string;
    live: string;
  };
  timer: {
    paragraph: string;
    button: string;
  };
  youtube: {
    title: string;
    paragraph: {
      first: string;
      second: string;
    };
    button: string;
  };
  tweets: {
    title: string;
    paragraph: {
      first: string;
      second: string;
    };
    button: string;
  };
  socials: {
    title: string;
    paragraph: {
      first: string;
      second: string;
    };
  };
  footer: {
    paragraph: string;
  };
  widget: {
    title: string;
  };
}

// import { getDictionary } from "@/lib/get-dictionary";

// interface Dictionary extends Awaited<ReturnType<typeof getDictionary>> {}
