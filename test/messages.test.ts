import { expect, server, BASE_URL } from './setup';
import { Message } from '../src/models/Message';

describe('Messages', () => {
  it('get messages page', (done) => {
    server
      .get(`${BASE_URL}/messages`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.messages).to.be.instanceOf(Array);
        res.body.messages.forEach((message: Message) => {
          expect(message).to.have.property('name');
          expect(message).to.have.property('message');
        });
        done();
      });
  });

  it('posts messages', (done) => {
    const data = { name: 'test', message: 'test message' };
    server
      .post(`${BASE_URL}/messages`)
      .send(data)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        const message = res.body.message;
        expect(message).to.have.property('id');
        expect(message).to.have.property('name', data.name);
        expect(message).to.have.property('message', `SAYS: ${data.message}`);
        done();
      });
  });
});
