// import { UserEdit } from './views/UserEdit';
// import { User } from './models/User';

// const user = User.buildUser({ name: 'BOOOOB', age: 3 });

// const rootElm = document.getElementById('root');
// if (rootElm) {
//   const userEdit = new UserEdit(rootElm, user);
//   userEdit.render();
//   console.log(userEdit);
// } else {
//   throw new Error('Root elm not found');
// }

import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';

const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on('change', () => {
  const root = document.getElementById('root');

  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();
