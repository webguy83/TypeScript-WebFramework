import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }
  abstract template(): string;

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    Object.keys(eventsMap).forEach((evtKey: string) => {
      const [eventName, selector] = evtKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[evtKey]);
      });
    });
  }

  mapRegions(fragment: DocumentFragment) {
    const regionsMap = this.regionsMap();

    Object.keys(regionsMap).forEach((key: string) => {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    });
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';
    const templateElm = document.createElement('template');
    templateElm.innerHTML = this.template();

    this.bindEvents(templateElm.content);
    this.mapRegions(templateElm.content);

    this.onRender();

    this.parent.append(templateElm.content);
  }
}
