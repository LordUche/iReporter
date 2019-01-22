/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import factory from '../fixtures';
import User from '../../server/models/user';

describe('User', () => {
  const password = '123456';
  let data;
  let hash;

  before(async () => {
    data = await factory.attrs('user');
    delete data.phonenumber;
  });

  after(async () => {
    factory.cleanUp();
  });

  it('creates a user object', () => {
    const user = new User(data);
    expect(user).to.be.an('object');
    expect(user.hash).to.be.a('string');
    expect(user.password).to.not.exist;
  });

  describe('User.hashPassword', () => {
    it('hashes a password', () => {
      hash = User.hashPassword(password);
      const hash2 = User.hashPassword(password);

      expect(User.hashPassword).to.be.a('Function');
      expect(hash).to.be.a('string');
      expect(hash).to.not.equal(hash2);
    });
  });

  describe('User.comparePassword', () => {
    it('compares a password with a hash', () => {
      hash = User.hashPassword(password);
      const wrongPassword = 'fakepassword';

      expect(User.comparePassword).to.be.a('Function');
      expect(User.comparePassword(password, hash)).to.be.true;
      expect(User.comparePassword(wrongPassword, hash)).to.be.false;
    });
  });
});
