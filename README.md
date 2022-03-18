# miniprogram-i18n-plus

## Quick Start

```
npm install miniprogram-i18n-plus -S
```

**example**

```ts
// app.js
import i18nInstance from "./miniprogram_npm/miniprogram-i18n-plus";

App({
  onLaunch() {
    const locales = {
      zh_CN: {
        test: "测试",
      },
      en_US: {
        test: "Test",
      },
    };

    i18nInstance.setLocale("zh_CN");

    i18nInstance.loadTranslations(locales);
  },
});
```

**Page index**

```ts
// index.ts

import i18nInstance from "./miniprogram_npm/miniprogram-i18n-plus";

Page({
  onLoad() {
    i18nInstance.effect(this);
  },
});
```

```wxml
<view>{{ $language.test }}</view>
```

webview will be render **测试**

## API

- **i18nInstance.setLocale(locale: string)**

  set current language name. like, `en_US`,`zh_CN`

- **i18nInstance.getLocale**

  get current language name

- **i18nInstance.loadTranslations(locales: ILocales)**

  load translations for i18nInstance, the params like this

  ```ts
    const locales: ILocales = {
      zh_CN: {
        key: "value",
      },
      en_US: {
        key: "value",
      },
    };
  ```

  ```ts
    interface ILocales {
      [x: string]: IObject;
    }

    interface IObject {
      [x: string]: string;
    }
  ```

- **i18nInstance.mergeTranslations(locales: ILocales)**

  merge new locales into origin locales.

- **i18nInstance.effect(context: any)**

  context is must be `this` in Page or Component.

  This effect api will set a `$language` property in `this.data`

- **i18nInstance.getLanguage()**

  get language config object in locales by locale.

- **i18nInstance.toggleLanguage(locale: string)**

  toggle language quickly. this api is combine width `setLocale` and `effect`

