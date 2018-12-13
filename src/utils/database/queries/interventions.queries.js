/* eslint-disable no-template-curly-in-string */
import db from '../config';

export default class InterventionsQuery {
  static getAll() {
    return db.any('SELECT * FROM incidents WHERE type=$1', 'intervention');
  }

  static get(id) {
    return db.one('SELECT * FROM incidents WHERE type=$1 AND id=$2', ['intervention', id]);
  }

  static create(data) {
    return db.one(
      'INSERT INTO incidents(type, comment, location, createdBy, Images, Videos) VALUES(${type}, ${comment}, ${location}, ${createdBy}, ${Images}, ${Videos}) RETURNING ID',
      data,
    );
  }

  static updateLocation(id, location) {
    return db.one('UPDATE incidents SET location=$1 WHERE type=$2 AND id=$3 RETURNING ID', [
      location,
      'intervention',
      id,
    ]);
  }

  static updateComment(id, comment) {
    return db.one('UPDATE incidents SET comment=$1 WHERE type=$2 AND id=$3 RETURNING ID', [
      comment,
      'intervention',
      id,
    ]);
  }

  static updateStatus(id, status) {
    return db.one('UPDATE incidents SET status=$1 WHERE type=$2 AND id=$3 RETURNING ID', [
      status,
      'intervention',
      id,
    ]);
  }

  static delete(id) {
    return db.one('DELETE FROM incidents WHERE type=$1 AND id=$2 RETURNING ID', [
      'intervention',
      id,
    ]);
  }
}
