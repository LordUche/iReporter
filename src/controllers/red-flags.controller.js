import incidents from '../utils/fakeDb';
import RedFlag from '../models/red-flag.model';

const redFlags = incidents.filter(incident => incident.type === 'red-flag');
/**
 * Red Flags Controller
 *
 * @export
 * @class RedFlagsController
 */
export default class RedFlagsController {
  /**
<<<<<<< HEAD
   * Gets all red-flag records
   *
   * @static
   * @param {object} req Request object
   * @param {object} res Response object
   * @memberof RedFlagsController
   */
  static index(req, res) {
    res.status(200).json({ data: redFlags, status: 200 });
  }

  /**
   * Gets a specific red-flag record
   *
   * @static
   * @param {object} req Request object
   * @param {object} res Response object
   * @param {Function} next A function that passes data to the next middleware
   * @memberof RedFlagsController
   */
  static get(req, res, next) {
    const data = redFlags.filter(redFlag => redFlag.id === parseInt(req.params.id, 10));
    if (data.length > 0) {
      res.status(200).json({ data, status: 200 });
    } else {
      next({ status: 404, error: 'That record does not exist' });
    }
  }

  /**
   * Creates a red-flag record
   *
   * @static
   * @param {object} req Request object
   * @param {object} res Response object
   * @param {Function} next A function that passes data to the next middleware
   * @memberof RedFlagsController
   */
  static create(req, res, next) {
    const {
      location, comment, Images, Videos, createdBy,
    } = req.body;

    if (location && comment && createdBy) {
      const id = Math.floor(Math.random() * 100000);
      incidents.push(
        new RedFlag({
          id,
          comment,
          location,
          createdBy,
          Images,
          Videos,
          createdOn: new Date(),
        }),
      );

      res.status(201).json({
        status: 201,
        data: [{ id, message: 'Created red-flag record' }],
      });
    } else {
      next({ status: 400, error: 'Failed to create record' });
    }
  }

  /**
   * Updates a specific red-flag's location
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {Function} next A function that passes data to the next middleware
   * @memberof RedFlagsController
   */
  static updateLocation(req, res, next) {
    const index = incidents.findIndex(redFlag => redFlag.id === parseInt(req.params.id, 10));

    if (index >= 0) {
      incidents[index].location = req.body.location;
      res.status(200).json({
        status: 200,
        data: [
          {
            id: incidents[index].id,
            message: "Updated red-flag record's location",
          },
        ],
      });
    } else {
      next({ status: 404, error: 'That record does not exist' });
    }
  }

  /**
   * Updates a specific red-flag's comment
   *
   * @static
   * @param {object} req Request object
   * @param {object} res Response object
   * @param {Function} next A function that passes data to the next middleware
   * @memberof RedFlagsController
   */
  static updateComment(req, res, next) {
    const index = incidents.findIndex(redFlag => redFlag.id === parseInt(req.params.id, 10));

    if (index >= 0) {
      incidents[index].comment = req.body.comment;
      res.status(200).json({
        status: 200,
        data: [
          {
            id: incidents[index].id,
            message: "Updated red-flag record's comment",
          },
        ],
      });
    } else {
      next({ status: 404, error: 'That record does not exist' });
    }
  }

  /**
   * Delete a specific red-flag record
   *
   * @static
   * @param {object} req Request object
   * @param {object} res Response object
   * @param {Function} next A function that passes data to the next middleware
   * @memberof RedFlagsController
   */
  static delete(req, res, next) {
    const index = incidents.findIndex(redFlag => redFlag.id === parseInt(req.params.id, 10));

    if (index >= 0) {
      incidents.splice(index, 1);
      res.status(200).json({
        status: 200,
        data: [
          {
            id: parseInt(req.params.id, 10),
            message: 'Deleted red-flag record',
          },
        ],
      });
    } else {
      next({ status: 404, error: 'That record does not exist' });
    }
  }
}
