import {
  createTables,
  insertIntoTables,
  dropTables,
} from '../src/utils/queryFunctions';
import { expect, server, BASE_URL } from './setup';

describe('Database Down', function () {
  this.timeout(10000);

  beforeEach('drop tables', async () => {
    await dropTables();
  });

  it('get messages page when the database is down', (done) => {
    server
      .get(`${BASE_URL}/messages`)
      .expect(500)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });

  // test updating a message when the database connection is closed
  it('update message when the database connection is closed', (done) => {
    server
      .put(`${BASE_URL}/messages/1`)
      .send({ name: 'test', message: 'test message' })
      .expect(500)
      .end(() => {
        done();
      });
  });

  // test to make sure that an error is thrown when the database is down
  it('posts messages with a message when the database is down', (done) => {
    const data = { name: 'test name', message: 'test message' };
    server
      .post(`${BASE_URL}/messages`)
      .send(data)
      .expect(500)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });

  // test getting a message by id when the database connection is closed
  it('get message by id when the database connection is closed', (done) => {
    server
      .get(`${BASE_URL}/messages/1`)
      .expect(500)
      .end(() => {
        done();
      });
  });

  // test deleting a message when the database connection is closed
  it('delete message when the database connection is closed', (done) => {
    server
      .delete(`${BASE_URL}/messages/1`)
      .expect(500)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });

  afterEach('reset tables', async () => {
    await createTables();
    await insertIntoTables();
  });
});
