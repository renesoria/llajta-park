import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Response } from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    nombre: string;
    rol: string;
    email: string;
  };
}

interface RegisterResponse {
  id: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  rol: string;
  fechaCreacion: string;
}

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let request; // Let TypeScript infer the type
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
    request = supertest(app.getHttpServer());
    dataSource = moduleFixture.get(DataSource);
  }, 20000);

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    // Clean up the database after each test
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0;');
    await queryRunner.clearTable('reservations');
    await queryRunner.clearTable('vehicles');
    await queryRunner.clearTable('parkings');
    await queryRunner.clearTable('users');
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1;');
    await queryRunner.release();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user', async () => {
      await request
        .post('/auth/register')
        .send({
          nombreCompleto: 'Test User',
          email: 'test_new_user@example.com', // Unique email
          telefono: '123456789',
          password: 'password',
        })
        .expect(201)
        .then((res: Response) => {
          const body: RegisterResponse = res.body as RegisterResponse;
          expect(body).not.toHaveProperty('password');
          expect(body).toHaveProperty('id');
          expect(body.email).toBe('test_new_user@example.com');
        });
    });

    it('should not register a user with an existing email', async () => {
      // First, register a user
      await request.post('/auth/register').send({
        nombreCompleto: 'Existing User',
        email: 'test_existing_user@example.com',
        telefono: '111111111',
        password: 'password',
      });

      // Then, try to register again with the same email
      await request
        .post('/auth/register')
        .send({
          nombreCompleto: 'Existing User 2',
          email: 'test_existing_user@example.com',
          telefono: '987654321',
          password: 'password123',
        })
        .expect(409);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login a user and return an access token', async () => {
      await request.post('/auth/register').send({
        nombreCompleto: 'Login Test User',
        email: 'login_test_user@example.com', // Unique email
        telefono: '111222333',
        password: 'password',
      });

      const response: Response = await request
        .post('/auth/login')
        .send({
          email: 'login_test_user@example.com',
          password: 'password',
        })
        .expect(200);

      const body: AuthResponse = response.body as AuthResponse;
      expect(body).toHaveProperty('access_token');
      expect(body.user.email).toBe('login_test_user@example.com');
    });

    it('should not login with invalid credentials', async () => {
      // Register a user for this test to attempt login against
      await request.post('/auth/register').send({
        nombreCompleto: 'Invalid Login User',
        email: 'invalid_login@example.com',
        telefono: '444555666',
        password: 'correct_password',
      });

      await request
        .post('/auth/login')
        .send({
          email: 'invalid_login@example.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });
});
