import { UserForm } from './views/UserForm';
import { User } from './models/User';

const rootElm = document.getElementById('root');
const form = new UserForm(rootElm, User.buildUser({ name: 'Curtis', age: 36 }));

form.render();
