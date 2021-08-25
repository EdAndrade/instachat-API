import supertest	from 'supertest';
import app			from '../../../api/app';

describe('Right path', () => {
	
	describe('POST /start_chat', () => {

		it('should response with a 200 status code', (done) => {

			supertest(app).post('/api/chat/start_chat').send({
				chatCode: 'f105c653282de0c01c2f7babd9b6589b'
			}).then( response => {
				expect(response.statusCode).toBe(200);
				done();
			});
		});
	});
});

describe('Wrong path', () => {
	
	describe('POST /start_chat', () => {

		it('should response with a 400 status code', (done) => {

			supertest(app).post('/api/chat/start_chat').send({
				chatCode: 'dk29dl1k3h#do1k3lsi%djap.lpi12d'
			}).then( response => {
				expect(response.statusCode).toBe(400);
				done();
			});
		});
	});
});