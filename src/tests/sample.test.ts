import func from '../api/toTest';
import { expect }	from 'chai';

describe('Sample Test', () => {

	it('Should test that true === true', () => {
		expect(true).to.equal(true);
	});

	it('should test a function', () => {
		expect(func(1)).to.equal(1);
	});
});