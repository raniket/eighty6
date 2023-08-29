import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	describe('Data fetch and store', () => {
		it('/api/v1/indego-data-fetch-and-store-it-db (POST)', () => {
			return request(app.getHttpServer())
				.post('/api/v1/indego-data-fetch-and-store-it-db')
				.set('Authorization', 'STATIC_TOKEN')
				.expect(201)
	
		});
	
		it('/api/v1/indego-data-fetch-and-store-it-db (POST) - Unauthorized', () => {
			return request(app.getHttpServer())
				.post('/api/v1/indego-data-fetch-and-store-it-db')
				.expect(401)
		});
	});

	describe('Get snapshot of all stations at a specific time', () => {
		it('/api/v1/stations (GET)', () => {
			return request(app.getHttpServer())
				.get('/api/v1/stations?at=2019-09-01T10:00:00')
				.set('Authorization', 'STATIC_TOKEN')
				.expect(200)
				.expect((res) => {
					expect(res.body).toHaveProperty('at');
					expect(res.body).toHaveProperty('stations');
					expect(res.body).toHaveProperty('weather');
				});
		});
	
		it('/api/v1/stations (GET) - Not Found', () => {
			return request(app.getHttpServer())
				.get('/api/v1/stations?at=2050-09-01T10:00:00')
				.set('Authorization', 'STATIC_TOKEN')
				.expect(404);
		});

		it('/api/v1/stations (GET) - Unauthorized', () => {
			return request(app.getHttpServer())
				.get('/api/v1/stations?at=2019-09-01T10:00:00')
				.expect(401);
		});
	});

	describe('Get snapshot of a specific station at a specific time', () => {
		it('/api/v1/stations/:kioskId (GET)', () => {
			return request(app.getHttpServer())
				.get('/api/v1/stations/3007?at=2019-09-01T10:00:00')
				.set('Authorization', 'STATIC_TOKEN')
				.expect(200)
				.expect((res) => {
					expect(res.body).toHaveProperty('at');
					expect(res.body).toHaveProperty('station');
					expect(res.body).toHaveProperty('weather');
				});
		});
	
		it('/api/v1/stations/:kioskId (GET) - Not Found', () => {
			return request(app.getHttpServer())
				.get('/api/v1/stations/3007?at=2050-09-01T10:00:00')
				.set('Authorization', 'STATIC_TOKEN')
				.expect(404);
		});

		it('/api/v1/stations/:kioskId (GET) - Unauthorized', () => {
			return request(app.getHttpServer())
				.get('/api/v1/stations/3007?at=2019-09-01T10:00:00')
				.expect(401);
		});
	});
});
