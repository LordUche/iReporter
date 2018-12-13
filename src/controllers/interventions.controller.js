import interventions from '../utils/database/queries/interventions.queries';
import Intervention from '../models/intervention.model';

export default class InterventionsController {
  static index(req, res) {
    return interventions
      .getAll()
      .then((data) => {
        res.status(200).json({ status: 200, data });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static get(req, res) {
    interventions
      .get(parseInt(req.params.id, 10))
      .then((data) => {
        res.status(200).json({ status: 200, data: [{ ...data }] });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static create(req, res) {
    const createdBy = req.user.id;
    return interventions
      .create({ ...new Intervention(req.body), createdBy })
      .then((data) => {
        res
          .status(201)
          .json({ status: 201, data: [{ ...data, message: 'Created intervention record' }] });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static updateLocation(req, res) {
    const { location } = req.body;
    return interventions
      .updateLocation(parseInt(req.params.id, 10), location)
      .then((data) => {
        res.status(200).json({
          status: 200,
          data: [{ ...data, message: "Updated intervention record's location" }],
        });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static updateComment(req, res) {
    const { comment } = req.body;
    return interventions
      .updateComment(parseInt(req.params.id, 10), comment)
      .then((data) => {
        res.status(200).json({
          status: 200,
          data: [{ ...data, message: "Updated intervention record's comment" }],
        });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static updateStatus(req, res) {
    const { status } = req.body;
    return interventions
      .updateStatus(parseInt(req.params.id, 10), status)
      .then((data) => {
        res.status(200).json({
          status: 200,
          data: [{ ...data, message: "Updated intervention record's status" }],
        });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static delete(req, res) {
    return interventions
      .delete(parseInt(req.params.id, 10))
      .then((data) => {
        res
          .status(200)
          .json({ status: 200, data: [{ ...data, message: 'Deleted intervention record' }] });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }
}
