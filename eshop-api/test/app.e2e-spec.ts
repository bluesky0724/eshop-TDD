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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/cart (POST)', async () => {
    await request(app.getHttpServer())
      .post('/cart')
      .send({ productId: '1' })
      .expect(201);

    return request(app.getHttpServer())
      .get('/cart')
      .expect(200)
      .expect((response) => {
        expect(response.body.length).toBe(1);
      });
  });

  it('/cart/all (DELETE)', async () => {
    await request(app.getHttpServer())
      .post('/cart')
      .send({ productId: '1' })
      .expect(201);

    await request(app.getHttpServer()).delete('/cart/all').expect(200);

    return await request(app.getHttpServer())
      .get('/cart')
      .expect(200)
      .expect((response) => {
        expect(response.body.length).toBe(0);
      });
  });

  describe('Test API for product /product', () => {
    it('/product (GET)', async () => {
      return await request(app.getHttpServer())
        .get('/product')
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBe(6);
        });
    });

    it('/product/?filter={filterText} (GET)', async () => {
      return await request(app.getHttpServer())
        .get('/product/?filter=orange')
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBe(3);
        });
    });
  });
});
