import redFlags from '../utils/database/queries/red-flags.queries';
import RedFlag from '../models/red-flag.model';

export default class RedFlagsController {
  static index(req, res) {
    return redFlags
      .getAll()
      .then((data) => {
        res.status(200).json({ status: 200, data });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static get(req, res) {
    redFlags
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
    return redFlags
      .create({ ...new RedFlag(req.body), createdBy })
      .then((data) => {
        res
          .status(201)
          .json({ status: 201, data: [{ ...data, message: 'Created red-flag record' }] });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static updateLocation(req, res) {
    const { location } = req.body;
    return redFlags
      .updateLocation(parseInt(req.params.id, 10), location)
      .then((data) => {
        res.status(200).json({
          status: 200,
          data: [{ ...data, message: "Updated red-flag record's location" }],
        });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static updateComment(req, res) {
    const { comment } = req.body;
    return redFlags
      .updateComment(parseInt(req.params.id, 10), comment)
      .then((data) => {
        res.status(200).json({
          status: 200,
          data: [{ ...data, message: "Updated red-flag record's comment" }],
        });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static updateStatus(req, res) {
    const { status } = req.body;
    return redFlags
      .updateStatus(parseInt(req.params.id, 10), status)
      .then((data) => {
        res.status(200).json({
          status: 200,
          data: [{ ...data, message: "Updated red-flag record's status" }],
        });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }

  static delete(req, res) {
    return redFlags
      .delete(parseInt(req.params.id, 10))
      .then((data) => {
        res
          .status(200)
          .json({ status: 200, data: [{ ...data, message: 'Deleted red-flag record' }] });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, error: err.message });
      });
  }
}
