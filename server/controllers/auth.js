import query from '../database/queries/auth';
import User from '../models/user';

export default class AuthController {
  static signup(req, res, next) {
    query
      .signup(new User({ ...req.body }))
      .then((user) => {
        res.status(201);
        req.user = user;
        next();
      })
      .catch((err) => {
        const error = err.code == 23505 ? err.detail : 'Something went wrong, please try again.';
        console.log(err.message);
        res.status(500).json({ status: res.statusCode, error });
      });
  }

  static login(req, res, next) {
    query
      .login(req.body.email)
      .then((user) => {
        if (User.comparePassword(req.body.password, user.hash)) {
          res.status(200);
          req.user = user;
          next();
        } else {
          res.status(422).json({ status: res.statusCode, error: '"password" is incorrect.' });
        }
      })
      .catch((err) => {
        const error = err.result && !err.result.rowCount
          ? `The email, "${req.body.email}" doesn't exist.`
          : 'Something went wrong, please try again.';
        res.status(500).json({ status: res.statusCode, error });
      });
  }
}
