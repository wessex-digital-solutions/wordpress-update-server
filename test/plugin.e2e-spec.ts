import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PluginController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/plugins (GET)', () => {
    return request(app.getHttpServer()).get('/plugins').expect(200);
  });

  it('Create new plugin', async () => {
    const plugin = {
      name: 'WDS Awesome Plugin',
      description: 'A plugin to make WordPress awesome',
      version: '1.0.0',
      homepage: 'https://www.wessexdigitalsolutions.co.uk/wordpress#plugins',
      keywords: ['awesome'],
      license: 'propriatry',
      repository: 'https://github.com/wessex-digital-solutions',
    };

    const data = await request(app.getHttpServer())
      .post('/plugins')
      .send(plugin)
      .expect(201);
    expect(data.body).toEqual({
      ...plugin,
      id: expect.any(String),
      enabled: true,
    });
  });
});
