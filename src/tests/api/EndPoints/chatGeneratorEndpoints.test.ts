import supertest 	from 'supertest';
import app			from '../../../api/app';

describe('Right path', () => {

	describe("POST /generate_code", () => {
		//should save the username and password to the database
	
		it("should respond with a 200 status code", (done) => {
	
			supertest(app).post("/api/chat/generate_code").send({
				usersQty	: 3,
				timeToInit	: '2020-02-02'
			}).then( response => {
				expect(response.statusCode).toBe(200);
				done();
			});
		});
	});

});

describe('Wrong path', () => {

	describe("POST /generate_code", () => {
		//should save the username and password to the database
	
		it("should respond with a 400 status code", (done) => {
	
			supertest(app).post("/api/chat/generate_code").send({
				UsersQuantity	: 3,
				timeToInit		: '2020-02-02'
			}).then( response => {
				expect(response.statusCode).toBe(400);
				done();
			});
		});

		it("should respond with a 400 status code", (done) => {
	
			supertest(app).post("/api/chat/generate_code").send({
				usersQty		: "2",
				timeToInit		: '2020-02-02'
			}).then( response => {
				expect(response.statusCode).toBe(400);
				done();
			});
		});
	});
});