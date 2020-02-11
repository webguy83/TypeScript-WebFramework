import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.rand-age': this.onButtonClick.bind(this),
      'click:.set-name': this.onSetButtonClick.bind(this),
      'click:.save-data': this.onSaveData.bind(this)
    };
  }

  onSaveData(): void {
    this.model.save();
  }

  onSetButtonClick(): void {
    const input = this.parent.querySelector('input');
    const name = input.value;
    this.model.set({ name });
  }

  onButtonClick(): void {
    this.model.setRandomAge();
  }

  template(): string {
    //   //<h1>User Form</h1>
    //   <div>User name: ${this.model.get('name')}</div>
    //   <div>User age: ${this.model.get('age')}</div>
    return `
        <div>
            <input placeholder="${this.model.get('name')}" />
            <button class="set-name">Gen</button>
            <button class="rand-age">Set Random Age</button>
            <button class="save-data">Save Data</button>
        </div>
        `;
  }
}
