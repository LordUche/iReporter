import request from 'request';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('API V1 Routes', () => {
  // const rootUrl = 'https://shrouded-tor-69589.herokuapp.com/api/v1';
  const rootUrl = 'http://localhost:3000/api/v1';

  describe('Red-flags', () => {
    const baseUrl = `${rootUrl}/red-flags`;

    describe('GET /red-flags', () => {
      it('should get all red-flag records', (done) => {
        request.get(baseUrl, (err, res, body) => {
          body = JSON.parse(body);
          expect(res.statusCode).to.eq(200);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(200);
          body.data.forEach((item) => {
            expect(item.type).to.eq('red-flag');
          });
          done();
        });
      });
    });

    describe('GET /red-flags/:id', () => {
      it('should get a specific red-flag record', (done) => {
        request.get(`${baseUrl}/1`, (err, res, body) => {
          body = JSON.parse(body);
          expect(res.statusCode).to.eq(200);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(200);
          expect(body.data[0].id).to.eq(1);
          done();
        });
      });

      it('should throw error if the record is not found', (done) => {
        request.get(`${baseUrl}/999`, (err, res, body) => {
          body = JSON.parse(body);
          expect(res.statusCode).to.eq(404);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(404);
          expect(body.data).to.be.undefined;
          expect(body.error).to.contain('That record does not exist');
          done();
        });
      });
    });

    describe('POST /red-flags', () => {
      it('should create a new red-flag record', (done) => {
        const options = {
          body: {
            location: 'Lat: 7.7153986, Lon: 8.5085987',
            comment: 'Bribery in Federal High Court, Makurdi',
            createdBy: 1,
          },
          json: true,
          url: baseUrl,
        };
        request.post(options, (err, res, body) => {
          expect(res.statusCode).to.eq(201);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(201);
          expect(body.data[0].id).not.to.be.undefined;
          expect(body.data[0].message).to.contain('Created red-flag record');
          done();
        });
      });

      it('should throw error if the request body is invalid', (done) => {
        const options = {
          body: {
            location: '',
            createdBy: 1,
          },
          json: true,
          url: baseUrl,
        };
        request.post(options, (err, res, body) => {
          expect(res.statusCode).to.eq(400);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(400);
          expect(body.data).to.be.undefined;
          expect(body.error).to.contain('Failed to create record');
          done();
        });
      });
    });

    describe('PATCH /red-flags/:id/location', () => {
      it('should update the location of a specific red-flag record', (done) => {
        const options = {
          body: { location: 'Lat: 7.7153984, Lon: 8.5085982' },
          url: `${baseUrl}/1/location`,
          json: true,
        };
        request.patch(options, (err, res, body) => {
          expect(res.statusCode).to.eq(200);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(200);
          expect(body.data[0].id).to.eq(1);
          expect(body.data[0].message).to.eq("Updated red-flag record's location");
          done();
        });
      });

      it('should throw error if the record is not found', (done) => {
        const options = {
          body: { location: 'Lat: 7.7153984, Lon: 8.5085982' },
          url: `${baseUrl}/999/location`,
          json: true,
        };
        request.patch(options, (err, res, body) => {
          expect(res.statusCode).to.eq(404);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(404);
          expect(body.data).to.be.undefined;
          expect(body.error).to.contain('That record does not exist');
          done();
        });
      });
    });

    describe('PATCH /red-flags/:id/comment', () => {
      it('should update the comment of a specific red-flag record', (done) => {
        const options = {
          body: { comment: 'Corruption in Makurdi town' },
          url: `${baseUrl}/1/comment`,
          json: true,
        };
        request.patch(options, (err, res, body) => {
          expect(res.statusCode).to.eq(200);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(200);
          expect(body.data[0].id).to.eq(1);
          expect(body.data[0].message).to.eq("Updated red-flag record's comment");
          done();
        });
      });

      it('should throw error if the record is not found', (done) => {
        const options = {
          body: { comment: 'Lat: 7.7153984, Lon: 8.5085982' },
          url: `${baseUrl}/999/comment`,
          json: true,
        };
        request.patch(options, (err, res, body) => {
          expect(res.statusCode).to.eq(404);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(404);
          expect(body.data).to.be.undefined;
          expect(body.error).to.contain('That record does not exist');
          done();
        });
      });
    });

    describe('DELETE /red-flags/:id', () => {
      it('should delete a specific red-flag record', (done) => {
        request.delete(`${baseUrl}/3`, (err, res, body) => {
          body = JSON.parse(body);
          expect(res.statusCode).to.eq(200);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(200);
          expect(body.data[0].id).to.eq(3);
          expect(body.data[0].message).to.contain('Deleted red-flag record');
          done();
        });
      });

      it('should throw error if the record is not found', (done) => {
        request.delete(`${baseUrl}/999`, (err, res, body) => {
          body = JSON.parse(body);
          expect(res.statusCode).to.eq(404);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(body.status).to.eq(404);
          expect(body.data).to.be.undefined;
          expect(body.error).to.contain('That record does not exist');
          done();
        });
      });
    });
  });
});
