const LANGUAGE_CHANGE_EVENT = "languageChangeEvent";

export const i18nEvent: i18nEvent = {
  eventMap: {},

  on(name: string, context: any, callback: Function) {
    let tuple = [context, callback];

    this.eventMap[name] = this.eventMap[name] || [];

    let list = this.eventMap[name];

    list.push(tuple);
  },

  emit(name: string, params: any) {
    const list: Array<any> | undefined = this.eventMap[name];

    list?.map((tuple: any) => {
      const context = tuple[0];
      const callback = tuple[1];

      callback.apply(context, params);
    });
  },

  remove(name: string, context: any) {
    const list = this.eventMap[name];
    if (list.length) {
      this.eventMap[name] = list.filter((tuple: any) => {
        return tuple[0] !== context;
      });
    }
  },
};

export class I18n {
  public locale: string;
  public locales: ILocales;

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

    this.invokeChange();
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

    // NOTICE:
    // if use track API give a custom name for event,
    // they will must call trigger API and use custom name as event name

    // update language config after merge data
    this.invokeChange();
  }

  getLanguage() {
    return this.locales[this.locale];
  }

  track(eventName: string, options: any) {
    const { context, callback } = options;

    callback();

    i18nEvent.on(eventName, context, callback);
  }

  trigger(name: string) {
    i18nEvent.emit(name);
  }

  effect(options: IEffectOptions) {
    const { context, callback } = options;

    this.track(LANGUAGE_CHANGE_EVENT, {
      context,
      callback,
    });
  }

  invokeChange() {
    this.trigger(LANGUAGE_CHANGE_EVENT);
  }
}

export const i18nInstance = new I18n();
