import { expect, server, BASE_URL } from './setup';
import { Plugin } from '../src/models/Plugin';

describe('Plugins', () => {
  it('should return plugins', async () => {
    const res = await server.get(`${BASE_URL}/plugins`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.plugins).to.be.instanceOf(Array);
    res.body.plugins.forEach((plugin: Plugin) => {
      expect(plugin).to.have.property('name');
      expect(plugin).to.have.property('version');
      expect(plugin).to.have.property('description');
      expect(plugin).to.have.property('author');
      expect(plugin).to.have.property('homepage');
      expect(plugin).to.have.property('keywords');
      expect(plugin).to.have.property('license');
      expect(plugin).to.have.property('repository');
    });
  });
});
