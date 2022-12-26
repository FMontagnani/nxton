import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST): 2 + 2', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({ equation: '2 + 2' })
      .expect(201)
      .expect({ result: 4 });
  });

  it('/ (POST): 2 + ( 1 / 5 ) * 5', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({ equation: '2 + ( 1 / 5 ) * 5' })
      .expect(201)
      .expect({ result: 3 });
  });

  it('/ (POST): Error 1 / 0', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({ equation: '1 / 0' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: "Bad Request: Can't divide by zero!",
      });
  });
});
