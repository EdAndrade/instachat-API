import supertest 	from 'supertest';
import app			from '../../../api/app';

describe("POST /users", () => {
	//should save the username and password to the database

	it("should respond with a 200 status code", (done) => {

		supertest(app).post("/api/generate_code").send({
			username: "username",
			password: "password"
		}).then( response => {
			expect(response.statusCode).toBe(200);
			done();
		});
	});
});