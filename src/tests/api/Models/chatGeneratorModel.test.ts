import ChatGeneratorModel	from '../../../api/Models/ChatGeneratorModel';
import { Chat }				from '../../../api/Types/ChatGenerator';

describe('Testing chatGeneratorModel', () => {

	let chatGeneratorModel: ChatGeneratorModel;

	beforeAll((done) => {
		chatGeneratorModel = new ChatGeneratorModel();
		done();
	});

	describe('Testing saveGeneratedCodeInfo method', () => {

		it('The insertion should be successful', (done) => {

			chatGeneratorModel.saveGeneratedCodeInfo({
				codeHash		: 'f3werfasfdfasdfs',
				usersQty		: 3,
				timeToInit		: '14:02',
				dateToInit		: '2020-02-02'

			}).then( response => {
				expect(response.success).toBe(true);
				done();
			});
			
		});

		it('The insertion should return specified properties', (done) => {

			chatGeneratorModel.saveGeneratedCodeInfo({
				codeHash		: 'f3werfasfdfasdfs',
				usersQty		: 3,
				timeToInit		: '14:02',
				dateToInit		: '2020-02-02'

			}).then( response => {

				expect(response.result).toMatchObject<Chat>({
					codeHash		: 'f3werfasfdfasdfs',
					usersQty		: 3,
					timeToInit		: '14:02',
					dateToInit		: '2020-02-02'
				});

				done();
			});
			
		});
	});

});