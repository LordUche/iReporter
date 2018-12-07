import IncidentsQuery from "../utils/database/incident.queries";

/**
 * Incidents Controller
 *
 * @export
 * @class IncidentsController
 */
export default class IncidentsController {
  /**
   * Index action gets all red-flag records
   *
   * @static
   * @param {object} req Request object
   * @param {object} res Response object
   * @param {Function} next A function that passes data to the next middleware
   * @memberof RedFlagsController
   */
  static index(req, res, next) {
    const { type } = req.params;
    IncidentsQuery.getAll(type.slice(0, -1))
      .then(data => {
        res.status(200).json({ status: 200, data });
      })
      .catch(err => next({ status: 500, error: err.message }));
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
    const { type, id } = req.params;
    IncidentsQuery.get(type.slice(0, -1), parseInt(id, 10))
      .then(data => {
        res.status(200).json({ data, status: 200 });
      })
      .catch(err => {
        next({ status: 404, error: err.message });
      });
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
    const { type } = req.params;
    IncidentsQuery.create(type.slice(0, -1), req.body)
      .then(data => {
        res.status(201).json({
          status: 201,
          data: [
            { id: data.id, message: `Created ${type.slice(0, -1)} record` }
          ]
        });
      })
      .catch(err => {
        next({ status: 400, error: err.message });
      });
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
  static update(req, res, next) {
    const { type, id, field } = req.params;
    IncidentsQuery.update(
      type.slice(0, -1),
      parseInt(id, 10),
      field.slice(0, -1),
      req.body
    )
      .then(data => {
        res.status(200).json({
          status: 200,
          data: [
            {
              id: data.id,
              message: `Updated ${type.slice(0, -1)} record's location`
            }
          ]
        });
      })
      .catch(err => {
        next({ status: 404, error: err.message });
      });
  }

  static delete(req, res, next) {
    const { type, id } = req.params;

    IncidentsQuery.delete(type.slice(0, -1), parseInt(id, 10))
      .then(data => {
        res.status(200).json({
          status: 200,
          data: [
            {
              id: data.id,
              message: `Deleted ${type.slice(0, -1)} record`
            }
          ]
        });
      })
      .catch(err => {
        next({ status: 404, error: err.message });
      });
  }
}
