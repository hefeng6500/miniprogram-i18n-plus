# miniprogram-i18n-plus

## Quick Start

```
npm install miniprogram-i18n-plus -S
```

**example**

```ts
// app.js
import { i18nStance } from "./miniprogram_npm/miniprogram-i18n-plus";

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

    i18nStance.setLocale("zh_CN");

    i18nStance.loadTranslations(locales);
  },
});
```

**Page index**

```ts
// index.ts

import { i18nStance } from "./miniprogram_npm/miniprogram-i18n-plus";

Page({
  data: {
    language: {},
  },
  onLoad() {
    i18nStance.effect({
      context: this,
      callback: this.setLanguage,
    });
  },
  setLanguage() {
    this.setData({
      language: i18nStance.getLanguage(),
    });
  },
});
```


```wxml
<view>{{ language.test }}</view>
```

webview will be render **测试**
