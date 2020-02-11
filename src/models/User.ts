import { Model } from './Model';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Collection } from './Collection';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const url = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Eventing(),
      new Attributes<UserProps>(attrs),
      new ApiSync<UserProps>(url)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(url, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  setRandomAge(): void {
    const randomAge = Math.round(Math.random() * 100);
    this.set({ age: randomAge });
  }
}
