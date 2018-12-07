import db from "./db.config";

export default class IncidentsQuery {
  static getAll(type) {
    return db.any("SELECT * FROM incidents WHERE type=$1", type);
  }

  static get(type, id) {
    return db.one("SELECT * FROM incidents WHERE type=$1 AND id=$2", [
      type,
      id
    ]);
  }

  static create(type, data) {
    const { comment, location, createdBy, Images, Videos } = data;
    return db.one(
      "INSERT INTO incidents(type, comment, location, createdBy, Images, Videos) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      [type, comment, location, createdBy, Images, Videos]
    );
  }

  static update(type, id, field, data) {
    return db.one(
      "UPDATE incidents SET comment=$1 WHERE type=$3 AND id=$4",
      [field, data[field], type, id]
    );
  }

  static delete(type, id) {
    return db.one("DELETE FROM incidents WHERE type=$1 AND id=$2", [type, id]);
  }
}
