export default class RedFlag {
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
