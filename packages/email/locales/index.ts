type Options = {
  locale?: string;
};

function translations(locale: string, params?: any) {
  switch (locale) {
    case "en":
      return {
     };
    case "sv":
      return {
        };

    default:
      return;
  }
}

export function getI18n({ locale = "en" }: Options) {
  return {
    t: (key: string, params?: any) => translations(locale, params)[key],
  };
}
