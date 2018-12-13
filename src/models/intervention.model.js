/**
 * Intervention
 *
 * @export
 * @class Intervention
 */
export default class Intervention {
  /**
   *Creates an instance of Intervention.
   * @param {*} {
   *     createdBy,
   *     location,
   *     comment,
   *     Images = [],
   *     Videos = [],
   *     id = null,
   *     status = 'draft',
   *     createdOn = null,
   *   }
   * @memberof Intervention
   */
  constructor({
    createdBy,
    location,
    comment,
    Images = [],
    Videos = [],
    id = null,
    status = 'draft',
    createdOn = null,
  }) {
    this.id = id;
    this.type = 'intervention';
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.location = location;
    this.comment = comment;
    this.status = status;
    this.Images = Images;
    this.Videos = Videos;
  }
}
