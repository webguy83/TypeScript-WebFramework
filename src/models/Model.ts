import { AxiosPromise, AxiosResponse } from 'axios';

type Callback = () => void;

interface HasId {
  id?: number;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  set(update: T): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export class Model<T extends HasId> {
  constructor(
    private events: Events,
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>
  ) {}
  get on() {
    return this.events.on.bind(this.events);
  }

  get trigger() {
    return this.events.trigger.bind(this.events);
  }

  get get() {
    return this.attributes.get.bind(this.attributes);
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    } else {
      this.sync.fetch(id).then((res: AxiosResponse): void => {
        this.set(res.data);
      });
    }
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
