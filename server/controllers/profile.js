import incidents from '../database/queries/profile';

export default class ProfileController {
  static profile(req, res, next) {
    const { user } = req;
    incidents(user.id)
      .then((data) => {
        const resolved = data.filter(x => x.status === 'resolved').length;
        const rejected = data.filter(x => x.status === 'rejected').length;
        const unresolved = data.filter(
          x => x.status === 'draft' || x.status === 'under investigation',
        ).length;
        res.status(200).json({
          status: res.statusCode,
          user,
          data,
          resolved,
          rejected,
          unresolved,
        });
      })
      .catch((err) => {
        res.status(500);
        next(new Error(err.message));
      });
  }
}
