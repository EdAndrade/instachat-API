import hashGenerator from '../../../api/Services/GenerateHashService';

describe('Testing hash generator', () => {

	test('Should return a hash string', () => {

		const hash = hashGenerator('test');
		expect(hash).toBe(typeof(new String()));
	});
});