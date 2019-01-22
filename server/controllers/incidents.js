import query from '../database/queries/incidents';
import Incident from '../models/incident';

const errorMessage = 'Something went wrong, please try again.';

export default class IncidentsController {
  static index(req, res, next) {
    return query
      .getAll(req.user, req.incidentType)
      .then((data) => {
        res.status(200).json({ status: res.statusCode, data });
      })
      .catch(() => {
        res.status(500);
        next(new Error(errorMessage));
      });
  }

  static get(req, res, next) {
    query
      .get(parseInt(req.params.id, 10), req.incidentType)
      .then((data) => {
        if (req.user.id === data.createdby) {
          res.status(200).json({ status: res.statusCode, data: [{ ...data }] });
        } else {
          res.status(403);
          next(new Error('You are not authorised!'));
        }
      })
      .catch(() => {
        res.status(500);
        next(new Error(errorMessage));
      });
  }

  static create(req, res, next) {
    const createdBy = req.user.id;
    const type = req.incidentType;
    return query
      .create({ ...new Incident(req.body), type, createdBy })
      .then((data) => {
        res.status(201).json({
          status: res.statusCode,
          data: [{ ...data, message: `Created ${req.incidentType} record` }],
        });
      })
      .catch(() => {
        res.status(500);
        next(new Error(errorMessage));
      });
  }

  static updateLocation(req, res, next) {
    const { location } = req.body;
    return query
      .updateLocation(parseInt(req.params.id, 10), location, req.incidentType)
      .then((data) => {
        res.status(200).json({
          status: res.statusCode,
          data: [{ ...data, message: `Updated ${req.incidentType} record's location` }],
        });
      })
      .catch(() => {
        res.status(500);
        next(new Error(errorMessage));
      });
  }

  static updateComment(req, res, next) {
    const { comment } = req.body;
    return query
      .updateComment(parseInt(req.params.id, 10), comment, req.incidentType)
      .then((data) => {
        res.status(200).json({
          status: res.statusCode,
          data: [{ ...data, message: `Updated ${req.incidentType} record's comment` }],
        });
      })
      .catch(() => {
        res.status(500);
        next(new Error(errorMessage));
      });
  }

  static updateStatus(req, res, next) {
    const { status } = req.body;
    return query
      .updateStatus(parseInt(req.params.id, 10), status, req.incidentType)
      .then((data) => {
        res.status(200).json({
          status: res.statusCode,
          data: [{ ...data, message: `Updated ${req.incidentType} record's status` }],
        });
      })
      .catch(() => {
        res.status(500);
        next(new Error(errorMessage));
      });
  }

  static delete(req, res, next) {
    return query
      .delete(parseInt(req.params.id, 10), req.incidentType)
      .then((data) => {
        res.status(200).json({
          status: res.statusCode,
          data: [{ ...data, message: `Deleted ${req.incidentType} record` }],
        });
      })
      .catch(() => {
        res.status(500);
        next(new Error(errorMessage));
      });
  }
}
