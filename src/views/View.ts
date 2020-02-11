import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
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

  render(): void {
    this.parent.innerHTML = '';
    const templateElm = document.createElement('template');
    templateElm.innerHTML = this.template();

    this.bindEvents(templateElm.content);

    this.parent.append(templateElm.content);
  }
}
