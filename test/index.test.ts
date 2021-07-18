import { expect, server, BASE_URL } from './setup';

describe('Index page test', () => {
  // test the home url
  it('should return 200 for root endpoint', done => {
    server.get('/').expect(200, done);
  });

  it('gets base url', (done) => {
    server
      .get(`${BASE_URL}/`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('API seems to be working');
        done();
      });
  });
});
