interface IEventMap {
  [index: string]: Array<any>;
}

interface i18nEvent {
  eventMap: IEventMap;
  on: Function;
  emit: Function;
  remove: Function;
}
