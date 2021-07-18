import { dropTables, resetTables } from '../src/utils/queryFunctions';
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

  // test getting a single message by id
  it('get message by id', (done) => {
    server
      .get(`${BASE_URL}/messages/1`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.have.property('name');
        expect(res.body.message).to.have.property('message');
        done();
      });
  });

  // test getting a single message by id that doesn't exist
  it('get message by id', (done) => {
    server
      .get(`${BASE_URL}/messages/100`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Not Found');
        done();
      });
  });

  // test creating a message
  it('create message', (done) => {
    const data = { name: 'test', message: 'test message' };
    server
      .post(`${BASE_URL}/messages`)
      .send(data)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.have.property('name');
        expect(res.body.message).to.have.property('message');
        expect(res.body.message).to.have.property(
          'message',
          `SAYS: ${data.message}`
        );
        done();
      });
  });

  // test updating a message
  it('update message', (done) => {
    server
      .put(`${BASE_URL}/messages/1`)
      .send({ name: 'test', message: 'test message' })
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.have.property('name');
        expect(res.body.message).to.have.property('message');
        done();
      });
  });

  // test updating a message that doesn't exist

  // test updating a message with invalid data

  // test deleting a message
  it('delete message', (done) => {
    server
      .delete(`${BASE_URL}/messages/1`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.be.empty;
        done();
      });
  });

  // test deleting a message that doesn't exist
  it('delete message when it does not exist', (done) => {
    server
      .delete(`${BASE_URL}/messages/100`)
      .expect(500)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Not Found');
        done();
      });
  });

  it('get messages page when the database is down', (done) => {
    dropTables();
    server
      .get(`${BASE_URL}/messages`)
      .expect(500)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
    resetTables();
  });

  // test to make sure that an error is thrown when a message is not sent
  it('posts messages without a message', (done) => {
    const data = { name: 'test name' };
    server
      .post(`${BASE_URL}/messages`)
      .send(data)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  // test updating a message when the database connection is closed
  it('update message when the database connection is closed', (done) => {
    dropTables().then(() => {
      server
        .put(`${BASE_URL}/messages/1`)
        .send({ name: 'test', message: 'test message' })
        .expect(500)
        .end(() => {
          resetTables();
          done();
        });
    });
  });

  // test to make sure that an error is thrown when the database is down
  it('posts messages with a message when the database is down', (done) => {
    const data = { name: 'test name', message: 'test message' };
    dropTables().then(() => {
      server
        .post(`${BASE_URL}/messages`)
        .send(data)
        .expect(500)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          resetTables();
          done();
        });
    });
  });

  // test getting a message by id when the database connection is closed
  it('get message by id when the database connection is closed', (done) => {
    dropTables().then(() => {
      server
        .get(`${BASE_URL}/messages/1`)
        .expect(500)
        .end(() => {
          resetTables();
          done();
        });
    });
  });

  // test deleting a message when the database connection is closed
  it('delete message when the database connection is closed', (done) => {
    dropTables().then(() => {
      server
        .delete(`${BASE_URL}/messages/1`)
        .expect(500)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          resetTables();
          done();
        });
    });
  });
});
