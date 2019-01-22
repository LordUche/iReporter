import factory from 'factory-girl';
import User from '../server/models/user';
import Incident from '../server/models/incident';

factory.define('user', User, {
  firstname: factory.chance('first'),
  lastname: factory.chance('last'),
  country: 'NG',
  phonenumber: factory.seq('User.phonenumber', n => `0701497083${n}`),
  username: factory.seq('User.username', n => `user${n}`),
  email: factory.seq('User.email', n => `user${n}@example.com`),
  password: '123456',
});

factory.define('red-flag', Incident, {
  location: factory.chance('coordinates'),
  comment: factory.chance('sentence'),
});

export default factory;
