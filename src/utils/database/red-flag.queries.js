import db from "./db.config";

/**
 * Query functions for the red-flag controller
 *
 * @export
 * @class RedFlagQuery
 */
export default class RedFlagQuery {
  /**
   * Get all red-flags
   *
   * @static
   * @memberof RedFlagQuery
   */
  static getAll() {
    db.any("SELECT * FROM incidents WHERE type='red-flag'")
      .then(data => {
        res.status(200).json({
          status: 200,
          data
        });
      })
      .catch(err => next(err));
  }
}
