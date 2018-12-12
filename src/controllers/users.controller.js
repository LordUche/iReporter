import query from '../utils/database/queries/users.queries';
import User from '../models/user.model';
import { signToken, hashPassword, comparePassword } from '../utils/helpers';

export default class UsersController {
  static signup(req, res) {
    const passwordHash = hashPassword(req.body.password);
    query
      .create({ ...new User(req.body), passwordHash })
      .then((user) => {
        const token = signToken(user);
        res.status(200).json({ status: 200, data: [{ token, user }] });
      })
      .catch((err) => {
        res.status(400).json({ status: 400, error: err.message });
      });
  }

  static login(req, res) {
    query
      .get(req.body.email)
      .then((data) => {
        const { passwordhash, ...user } = data;
        if (!comparePassword(req.body.password, passwordhash)) {
          throw new Error('Invalid password');
        }
        const token = signToken(user);
        res.status(200).json({ status: 200, data: [{ token, user }] });
      })
      .catch((err) => {
        res.status(400).json({ status: 400, error: err.message });
      });
  }
}
