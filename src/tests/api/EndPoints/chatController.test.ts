import supertest from 'supertest';
import app from '../../../api/app';

describe('Right path' , () => {

	describe('POST /generate_chat', () => {

		it('should response with a status 200', (done) => {

			supertest(app).post('/api/chat/generate_chat').send({
				"usersQty": 4,
				"name": "test"

			}).then( response => {

				expect(response.statusCode).toBe(200);
				done();
			});
		});

		it('should have code property', ( done ) => {

			supertest(app).post('/api/chat/generate_chat').send({
				"usersQty": 4,
				"name": "test"
			}).then( response => {
				expect(JSON.parse(response.text)).toHaveProperty(['data', 'code']);
				done();
			});
		});

		it('should have name property', ( done ) => {

			supertest(app).post('/api/chat/generate_chat').send({
				"usersQty": 4,
				"name": "test"
			}).then( response => {
				expect(JSON.parse(response.text)).toHaveProperty(['data', 'name']);
				done();
			});
		});

		it('should have userQty property', ( done ) => {

			supertest(app).post('/api/chat/generate_chat').send({
				"usersQty": 4,
				"name": "test"
			}).then( response => {
				expect(JSON.parse(response.text)).toHaveProperty(['data', 'usersQty']);
				done();
			});
		});
	});
});

describe('Wrong path', () => {

	describe('POST /generate_chat', () => {

		it('should return a 400 error code', (done) => {

			supertest(app).post('/api/chat/generate_chat').send({
				"usersQty": '',
				"name": "test"

			}).then( response => {

				expect(response.statusCode).toBe(400);
				done();
			});
		});

		it('should return a 400 error code', (done) => {

			supertest(app).post('/api/chat/generate_chat').send({
				"usersQty": 2,
				"name": 2

			}).then( response => {

				expect(response.statusCode).toBe(400);
				done();
			});
		});
	});
});

afterAll(done => {
	done();
});