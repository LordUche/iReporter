const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const redFlags = require('./fixtures/red-flags.json');
const expect = chai.expect;
chai.use(chaiHttp);

describe('API V1 Routes', () => {
	let rootUrl = `https://shrouded-tor-69589.herokuapp.com/api/v1`;

	describe('Red-flags', () => {
		let baseUrl = `${rootUrl}/red-flags`;

		describe('GET /red-flags', () => {
			it('should get all red-flag records', (done) => {
				request.get(baseUrl, (err, res, body) => {
					body = JSON.parse(body);
					expect(res.statusCode).to.eq(200);
					expect(res.headers['content-type']).to.contain('application/json');
					expect(body.status).to.eq(200);
					body.data.forEach(item => {
						expect(item.type).to.eq('red-flag');
					});
					done();
				})
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
				})
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
					url: baseUrl
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
					url: baseUrl
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

		describe('PUT /red-flags/:id/location', () => {
			it('should update the location of a specific red-flag record', (done) => {
				const options = {
					body: { location: 'Lat: 7.7153984, Lon: 8.5085982' },
					url: `${baseUrl}/1/location`,
					json: true,
				};
				request.put(options, (err, res, body) => {
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
				request.put(options, (err, res, body) => {
					expect(res.statusCode).to.eq(404);
					expect(res.headers['content-type']).to.contain('application/json');
					expect(body.status).to.eq(404);
					expect(body.data).to.be.undefined;
					expect(body.error).to.contain('That record does not exist');
					done();
				});
			});
		});

		describe('PUT /red-flags/:id/comment', () => {
			it('should update the comment of a specific red-flag record', (done) => {
				const options = {
					body: { comment: 'Corruption in Makurdi town' },
					url: `${baseUrl}/1/comment`,
					json: true,
				};
				request.put(options, (err, res, body) => {
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
				request.put(options, (err, res, body) => {
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

describe('Stubbed API V1 Routes', () => {
	let rootUrl = `https://shrouded-tor-69589.herokuapp.com/api/v1`;
	let successResponse;
	let errorResponse;

	describe('Red-flags', () => {
		let baseUrl = `${rootUrl}/red-flags`;

		beforeEach(() => {
			this.get = sinon.stub(request, 'get');
			this.post = sinon.stub(request, 'post');
			this.put = sinon.stub(request, 'put');
			this.delete = sinon.stub(request, 'delete');
		});

		afterEach(() => {
			request.get.restore();
			request.post.restore();
			request.put.restore();
			request.delete.restore();
		});
			
		describe('GET /red-flags', () => {

			beforeEach(() => {
				successResponse = redFlags.all.success;
			});

			it('should get all red-flag records', (done) => {
				this.get.yields(null, successResponse.res, JSON.stringify(successResponse.body));
				request.get(baseUrl, (err, res, body) => {
					body = JSON.parse(body);
					expect(res.statusCode).to.eq(200);
					expect(res.headers['content-type']).to.contain('application/json');
					expect(body.status).to.eq(200);
					expect(body.data[1].comment).to.contain('Flood in High-level, Makurdi');
					done();
				})
			});
		});

		describe('GET /red-flags/:id', () => {
			
			beforeEach(() => {
				successResponse = redFlags.single.success;
				errorResponse = redFlags.single.failure;
			});

			it('should get a specific red-flag record', (done) => {
				this.get.yields(null, successResponse.res, JSON.stringify(successResponse.body));
				request.get(`${baseUrl}/2`, (err, res, body) => {
					body = JSON.parse(body);
					expect(res.statusCode).to.eq(200);
					expect(res.headers['content-type']).to.contain('application/json');
					expect(body.status).to.eq(200);
					expect(body.data[0].id).to.eq(2);
					expect(body.data[0].comment).to.contain('Flood in High-level, Makurdi');
					done();
				})
			});

			it('should throw error if the record is not found', (done) => {
				this.get.yields(null, errorResponse.res, JSON.stringify(errorResponse.body));
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

			beforeEach(() => {
				successResponse = redFlags.add.success;
				errorResponse = redFlags.add.failure;
			});
	
			it('should create a new red-flag record', (done) => {
				const options = {
				body: {
					location: 'Lat: 7.7153986, Lon: 8.5085987',
					comment: 'Bribery in Federal High Court, Makurdi',
					createdBy: 1,
				},
					json: true,
					url: baseUrl
				};
				this.post.yields(null, successResponse.res, JSON.stringify(successResponse.body));
				request.post(options, (err, res, body) => {
					body = JSON.parse(body);
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
					url: baseUrl
				};
				this.post.yields(null, errorResponse.res, JSON.stringify(errorResponse.body));
				request.post(options, (err, res, body) => {
					body = JSON.parse(body);
					expect(res.statusCode).to.eq(400);
					expect(res.headers['content-type']).to.contain('application/json');
					expect(body.status).to.eq(400);
					expect(body.data).to.be.undefined;
					expect(body.error).to.contain('Failed to create record');
					done();
				});
			});
		});

		describe('PUT /red-flags/:id/location', () => {
			
			beforeEach(() => {
				successResponse = redFlags.updateLocation.success;
				errorResponse = redFlags.updateLocation.failure;
			});

			it('should update the location of a specific red-flag record', (done) => {
				const options = {
					body: { location: 'Lat: 7.7153984, Lon: 8.5085982' },
					url: `${baseUrl}/2/location`,
					json: true,
				};
				this.put.yields(null, successResponse.res, JSON.stringify(successResponse.body));
				request.put(options, (err, res, body) => {
					body = JSON.parse(body);
					expect(res.statusCode).to.eq(200);
					expect(res.headers['content-type']).to.contain('application/json');
					expect(body.status).to.eq(200);
					expect(body.data[0].id).to.eq(2);
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
				this.put.yields(null, errorResponse.res, JSON.stringify(errorResponse.body));
				request.put(options, (err, res, body) => {
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

		describe('PUT /red-flags/:id/comment', () => {
			
			beforeEach(() => {
				successResponse = redFlags.updateComment.success;
				errorResponse = redFlags.updateComment.failure;
			});

			it('should update the comment of a specific red-flag record', (done) => {
				const options = {
					body: { comment: 'Flood in Makurdi town' },
					url: `${baseUrl}/2/comment`,
					json: true,
				};
				this.put.yields(null, successResponse.res, JSON.stringify(successResponse.body));
				request.put(options, (err, res, body) => {
					body = JSON.parse(body);
					expect(res.statusCode).to.eq(200);
					expect(res.headers['content-type']).to.contain('application/json');
					expect(body.status).to.eq(200);
					expect(body.data[0].id).to.eq(2);
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
				this.put.yields(null, errorResponse.res, JSON.stringify(errorResponse.body));
				request.put(options, (err, res, body) => {
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

		describe('DELETE /red-flags/:id', () => {
			
			beforeEach(() => {
				successResponse = redFlags.delete.success;
				errorResponse = redFlags.delete.failure;
			});

			it('should delete a specific red-flag record', (done) => {
				this.delete.yields(null, successResponse.res, JSON.stringify(successResponse.body));
				request.delete(`${baseUrl}/2`, (err, res, body) => {
					body = JSON.parse(body);
					expect(res.statusCode).to.eq(204);
					expect(res.headers['content-type']).to.contain('application/json');
					expect(body.status).to.eq(204);
					expect(body.data[0].id).to.eq(2);
					expect(body.data[0].message).to.contain('Deleted red-flag record');
					done();
				});
			});

			it('should throw error if the record is not found', (done) => {
				this.delete.yields(null, errorResponse.res, JSON.stringify(errorResponse.body));
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