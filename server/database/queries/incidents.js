/* eslint-disable no-template-curly-in-string */
import db from '../config';

export default class IncidentsQuery {
  static getAll(user, type) {
    if (user.isadmin) {
      return db.any('SELECT * FROM incidents WHERE type=$1', type);
    }
    return db.any('SELECT * FROM incidents WHERE type=$1 AND createdby=$2', [type, user.id]);
  }

  static get(id, type) {
    return db.one('SELECT * FROM incidents WHERE type=$1 AND id=$2', [type, id]);
  }

  static create(data) {
    return db.one(
      'INSERT INTO incidents(type, comment, location, createdBy, Images, Videos) VALUES(${type}, ${comment}, ${location}, ${createdBy}, ${Images}, ${Videos}) RETURNING ID',
      data,
    );
  }

  static updateLocation(id, location, type) {
    return db.one('UPDATE incidents SET location=$1 WHERE type=$2 AND id=$3 RETURNING ID', [
      location,
      type,
      id,
    ]);
  }

  static updateComment(id, comment, type) {
    return db.one('UPDATE incidents SET comment=$1 WHERE type=$2 AND id=$3 RETURNING ID', [
      comment,
      type,
      id,
    ]);
  }

  static updateStatus(id, status, type) {
    return db.one('UPDATE incidents SET status=$1 WHERE type=$2 AND id=$3 RETURNING ID', [
      status,
      type,
      id,
    ]);
  }

  static delete(id, type) {
    return db.one('DELETE FROM incidents WHERE type=$1 AND id=$2 RETURNING ID', [type, id]);
  }
}
