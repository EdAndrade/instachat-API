import ChatGeneratorModel from '../../../api/Models/ChatGeneratorModel';

describe('Testing chatGeneratorModel', () => {

	let chatGeneratorModel: ChatGeneratorModel;

	beforeAll((done) => {
		chatGeneratorModel = new ChatGeneratorModel();
		done();
	});

	describe('Testing chat generated info', () => {

		it('The insertion should be successful', (done) => {

			chatGeneratorModel.saveGeneratedCodeInfo({
				codeHash		: 'f3werfasfdfasdfs',
				UsersQuantity	: 3,
				timeToInit		: '2020-02-02'

			}).then( response => {
				expect(response.success).toBe(true);
				done();
			});
			
		});
	});

});