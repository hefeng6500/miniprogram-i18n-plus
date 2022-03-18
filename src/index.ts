export class I18n {
  public locale: string;
  public locales: ILocales;
  public context: any;

  constructor(locales?: ILocales) {
    this.locale = "";
    this.locales = locales || {};
  }

  setLocale(locale: string) {
    this.locale = locale;
  }

  getLocale() {
    return this.locale;
  }

  loadTranslations(locales: ILocales) {
    this.locales = locales;

    return this.context && this.effect(this.context);
  }

  mergeTranslations(newLocales: ILocales) {
    for (const key in newLocales) {
      if (this.locales[key]) {
        this.locales[key] = {
          ...this.locales[key],
          ...newLocales[key],
        };
      } else {
        this.locales[key] = newLocales[key];
      }
    }

    return this.context && this.effect(this.context);
  }

  getLanguage() {
    return this.locales[this.locale];
  }

  effect(context: any) {
    this.context = context;

    if (!context.setData) {
      return;
    }

    return new Promise((resolve) => {
      context.setData(
        {
          $language: this.getLanguage(),
        },
        () => {
          resolve(context["$language"]);
        }
      );
    });
  }

  toggleLanguage(locale: string) {
    this.setLocale(locale);

    return this.effect(this.context);
  }
}

const i18nInstance = new I18n();

export default i18nInstance;
export { i18nInstance };
