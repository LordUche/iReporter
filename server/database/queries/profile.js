import db from '../config';

export default function incidents(userId) {
  return db.any('SELECT * FROM incidents WHERE createdby=$1', userId);
}
