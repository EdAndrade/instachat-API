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

		it('should have informed properties', ( done ) => {

			supertest(app).post('/api/chat/generate_chat').send({
				"usersQty": 4,
				"name": "test"

			}).then( response => {

				expect(response).toHaveProperty('userQty');
				expect(response).toHaveProperty('name');
				expect(response).toHaveProperty('code');
				done();
			});
		});
	});
});