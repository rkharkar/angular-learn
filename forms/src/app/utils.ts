export function createEvent(eventType: any): Event {
  const evt: Event = document.createEvent('Event');
  evt.initEvent(eventType, true, true);
  return evt;
}

export function dispatchEvent(element: any, eventType: any) {
  element.dispatchEvent(createEvent(eventType));
}

export class ConsoleSpy {
  public logs: string[] = [];

  log(...args: any[]) {
    this.logs.push(args.join(" "));
  }
  warn(...args: any[]) {
    this.log(...args);
  }
}
