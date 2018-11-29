const request = require('request');
const sinon = require('sinon');
const redFlags = require('./fixtures/red-flags.json');

describe('API v1 routes', () => {
	let rootUrl = 'http://localhost:3000/api/v1';
	let successResponse;
	let errorResponse;

	describe('Red-flags', () => {
		let baseUrl = `${rootUrl}/red-flags`;
		
		describe('GET /red-flags', () => {
			
		});

		describe('POST /red-flags', () => {
			
			beforeEach(() => {
				successResponse = redFlags.add.success;
				errorResponse = redFlags.add.failure;

				this.get = sinon.stub(request, 'get');
				this.post = sinon.stub(request, 'post');
				this.put = sinon.stub(request, 'put');
				this.delete = sinon.stub(request, 'delete');
			})

			afterEach(() => {
				request.get.restore();
				request.post.restore();
				request.put.restore();
				request.delete.restore();
			})

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
					expect(res.statusCode).toBe(201);
					expect(res.headers['content-type']).toContain('application/json');
					body = JSON.parse(body);
					expect(body.status).toBe(201);
					expect(body.data[0].id).toBeDefined();
					expect(body.data[0].message).toBe('Created red-flag record');
					done();
				});
			});

			it('should throw an error if request body is invalid', (done) => {
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
					expect(res.statusCode).toBe(400);
					expect(res.headers['content-type']).toContain('application/json');
					body = JSON.parse(body);
					expect(body.status).toBe(400);
					expect(body.data).not.toBeDefined();
					expect(body.error).toBe('Failed to create record');
					done();
				});
			});
		});
	});
});