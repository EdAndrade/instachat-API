import func from '../api/toTest';
import { expect }	from 'chai';
import classT from '../api/classexample';

describe('Sample Test', () => {

	it('Should test that true === true', () => {
		expect(true).to.equal(true);
	});

	it('should test a function', () => {
		expect(func(1)).to.equal(1);
	});
});


describe('Sample Test', () => {

	const thisclass = new classT();

	it('should test a function', () => {
		expect(thisclass.firstM()).to.equal(true);
	});
});