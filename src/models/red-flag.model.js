/**
 * Red Flag
 *
 * @export
 * @class RedFlag
 */
export default class RedFlag {
  /**
   *Creates an instance of RedFlag.
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
   * @memberof RedFlag
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
    this.type = 'red-flag';
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.location = location;
    this.comment = comment;
    this.status = status;
    this.Images = Images;
    this.Videos = Videos;
  }
}
