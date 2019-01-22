import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import server from '../../server';

chai.use(chaiHTTP);

describe('Catch-all routes', () => {
  it('should return 404 for undefined routes', (done) => {
    chai
      .request(server)
      .get('/api/v1/undefined')
      .end((err, res) => {
        const { status, error } = res.body;
        expect(res).to.have.status(404);
        expect(status).to.equal(res.statusCode);
        expect(error).to.be.a('string');
        done(err);
      });
  });
});
