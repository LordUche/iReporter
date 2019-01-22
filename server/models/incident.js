export default class Incident {
  constructor({
    location, comment, Images, Videos,
  }) {
    this.location = location;
    this.comment = comment;
    this.status = 'draft';
    this.Images = Images || [];
    this.Videos = Videos || [];
  }
}
