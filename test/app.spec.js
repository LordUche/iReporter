import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('API V1 Routes', () => {
  const rootUrl = '/api/v1';

  describe('Red-flags', () => {
    const baseUrl = `${rootUrl}/red-flags`;

    describe('GET /red-flags', () => {
      it('should get all red-flag records', (done) => {
        chai.request(server)
          .get(baseUrl)
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            res.body.data.forEach((item) => {
              expect(item.type).to.eq('red-flag');
            });
            done();
          });
      });
    });

    describe('GET /red-flags/:id', () => {
      it('should get a specific red-flag record', (done) => {
        chai.request(server)
          .get(`${baseUrl}/1`)
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            expect(res.body.data[0].id).to.eq(1);
            done();
          });
      });

      it('should throw error if the record is not found', (done) => {
        chai.request(server)
          .get(`${baseUrl}/999`)
          .end((err, res) => {
            expect(res.statusCode).to.eq(404);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(404);
            expect(res.body.data).to.be.undefined;
            expect(res.body.error).to.contain('That record does not exist');
            done();
          });
      });
    });

    describe('POST /red-flags', () => {
      it('should create a new red-flag record', (done) => {
        const redFlag = {
          location: 'Lat: 7.7153986, Lon: 8.5085987',
          comment: 'Bribery in Federal High Court, Makurdi',
          createdBy: 1,
        };
        chai.request(server)
          .post(baseUrl)
          .send(redFlag)
          .end((err, res) => {
            expect(res.statusCode).to.eq(201);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(201);
            expect(res.body.data[0].id).not.to.be.undefined;
            expect(res.body.data[0].message).to.contain('Created red-flag record');
            done();
          });
      });

      it('should throw error if the request body is invalid', (done) => {
        const redFlag = {
          location: '',
          createdBy: 1,
        };
        chai.request(server)
          .post(baseUrl)
          .send(redFlag)
          .end((err, res) => {
            expect(res.statusCode).to.eq(400);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(400);
            expect(res.body.data).to.be.undefined;
            expect(res.body.error).to.contain('Failed to create record');
            done();
          });
      });
    });

    describe('PATCH /red-flags/:id/location', () => {
      it('should update the location of a specific red-flag record', (done) => {
        const location = { location: 'Lat: 7.7153984, Lon: 8.5085982' };

        chai.request(server)
          .patch(`${baseUrl}/1/location`)
          .send(location)
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            expect(res.body.data[0].id).to.eq(1);
            expect(res.body.data[0].message).to.eq("Updated red-flag record's location");
            done();
          });
      });

      it('should throw error if the record is not found', (done) => {
        const location = { location: 'Lat: 7.7153984, Lon: 8.5085982' };

        chai.request(server)
          .patch(`${baseUrl}/999/location`)
          .send(location)
          .end((err, res) => {
            expect(res.statusCode).to.eq(404);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(404);
            expect(res.body.data).to.be.undefined;
            expect(res.body.error).to.contain('That record does not exist');
            done();
          });
      });
    });

    describe('PATCH /red-flags/:id/comment', () => {
      it('should update the comment of a specific red-flag record', (done) => {
        const comment = { comment: 'Corruption in Makurdi town' };

        chai.request(server)
          .patch(`${baseUrl}/1/comment`)
          .send(comment)
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            expect(res.body.data[0].id).to.eq(1);
            expect(res.body.data[0].message).to.eq("Updated red-flag record's comment");
            done();
          });
      });

      it('should throw error if the record is not found', (done) => {
        const comment = { comment: 'Lat: 7.7153984, Lon: 8.5085982' };

        chai.request(server)
          .patch(`${baseUrl}/999/comment`)
          .send(comment)
          .end((err, res) => {
            expect(res.statusCode).to.eq(404);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(404);
            expect(res.body.data).to.be.undefined;
            expect(res.body.error).to.contain('That record does not exist');
            done();
          });
      });
    });

    describe('DELETE /red-flags/:id', () => {
      it('should delete a specific red-flag record', (done) => {
        chai.request(server)
          .delete(`${baseUrl}/3`)
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            expect(res.body.data[0].id).to.eq(3);
            expect(res.body.data[0].message).to.contain('Deleted red-flag record');
            done();
          });
      });

      it('should throw error if the record is not found', (done) => {
        chai.request(server)
          .delete(`${baseUrl}/999`)
          .end((err, res) => {
            expect(res.statusCode).to.eq(404);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(404);
            expect(res.body.data).to.be.undefined;
            expect(res.body.error).to.contain('That record does not exist');
            done();
          });
      });
    });
  });
});
