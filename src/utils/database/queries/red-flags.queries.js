/* eslint-disable no-template-curly-in-string */
import db from '../config';

export default class RedFlagsQuery {
  static getAll() {
    return db.any('SELECT * FROM incidents WHERE type=$1', 'red-flag');
  }

  static get(id) {
    return db.one('SELECT * FROM incidents WHERE type=$1 AND id=$2', ['red-flag', id]);
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
      'red-flag',
      id,
    ]);
  }

  static updateComment(id, comment) {
    return db.one('UPDATE incidents SET comment=$1 WHERE type=$2 AND id=$3 RETURNING ID', [
      comment,
      'red-flag',
      id,
    ]);
  }

  static delete(id) {
    return db.one('DELETE FROM incidents WHERE type=$1 AND id=$2 RETURNING ID', ['red-flag', id]);
  }
}
