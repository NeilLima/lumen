/* eslint-disable prettier/prettier */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  const email = `e2e-${Date.now()}@lumen.com`;
  const password = 'senha12345';
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/register - cria usuário', () =>
    request(app.getHttpServer())
      .post('/auth/register')
      .send({ firstName: 'E2E', lastName: 'Tester', email, password })
      .expect(201)
      .expect((res) => {
        expect(res.body.user.email).toBe(email);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.password).toBeUndefined();
      }));

  it('POST /auth/register - falha com e-mail duplicado', () =>
    request(app.getHttpServer())
      .post('/auth/register')
      .send({ firstName: 'E2E', lastName: 'Tester', email, password })
      .expect(409));

  it('POST /auth/register - falha com payload inválido', () =>
    request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'invalido', password: '123' })
      .expect(400));

  it('POST /auth/login - autentica usuário criado', () =>
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(201)
      .expect((res) => {
        expect(res.body.token).toBeDefined();
        token = res.body.token;
      }));

  it('POST /auth/login - falha com senha errada', () =>
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password: 'errada1234' })
      .expect(401));

  it('GET /auth/me - retorna usuário autenticado', () =>
    request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(email);
      }));

  it('GET /auth/me - falha sem token', () =>
    request(app.getHttpServer()).get('/auth/me').expect(401));
});
