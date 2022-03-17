interface IEventMap {
  [index: string]: Array<any>;
}

interface i18nEvent {
  eventMap: IEventMap;
  on: Function;
  emit: Function;
  remove: Function;
}

interface ILocales {
  [x: string]: IObject;
}

interface IObject {
  [x: string]: string;
}

interface IEffectOptions {
  context: any;
  callback: Function;
}
