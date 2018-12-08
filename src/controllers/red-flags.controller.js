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
  static get(req, res) {
    const data = redFlags.filter(redFlag => redFlag.id === parseInt(req.params.id, 10));
    if (data.length > 0) {
      res.status(200).json({ data, status: 200 });
    } else {
      res.status(404).json({ status: 404, error: 'That route does not exist' });
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
  static create(req, res) {
    const {
      location, comment, Images, Videos, createdBy,
    } = req.body;

    if (location.trim() && comment.trim() && !isNaN(createdBy)) {
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
      res.status(400).json({ status: 400, error: 'Please supply the location, comment and createdBy id' });
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
  static updateLocation(req, res) {
    const index = incidents.findIndex(redFlag => redFlag.id === parseInt(req.params.id, 10));

    if (index >= 0) {
      if (!req.body.location.trim()) {
        return res.status(400).json({ status: 400, error: 'Please enter a location' });
      }
      incidents[index].location = req.body.location;
      return res.status(200).json({
        status: 200,
        data: [
          {
            id: incidents[index].id,
            message: "Updated red-flag record's location",
          },
        ],
      });
    }
    return res.status(404).json({ status: 404, error: 'That route does not exist' });
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
      if (!req.body.comment.trim()) {
        return res.status(400).json({ status: 400, error: 'Please enter a comment' });
      }
      incidents[index].comment = req.body.comment;
      return res.status(200).json({
        status: 200,
        data: [
          {
            id: incidents[index].id,
            message: "Updated red-flag record's comment",
          },
        ],
      });
    }
    return res.status(404).json({ status: 404, error: 'That route does not exist' });
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
  static delete(req, res) {
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
      res.status(404).json({ status: 404, error: 'That route does not exist' });
    }
  }
}
