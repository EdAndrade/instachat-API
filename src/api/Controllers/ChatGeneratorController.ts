import ChatGeneratorModel 		from '../Models/ChatGeneratorModel';
import { Request, Response }	from 'express';
import { Chat }					from '../Types/ChatGenerator';

export default class ChatGeneratorController {

	private readonly chatGeneratorModel: ChatGeneratorModel;

	constructor(){
		this.chatGeneratorModel	= new ChatGeneratorModel();
		this.generateChat		= this.generateChat.bind(this);
	}

	async generateChat(request: Request, response: Response){

		const chatRequest: Chat = request.body;

		this.chatGeneratorModel.saveGeneratedCodeInfo(chatRequest).then( chatResponse => {

			if(chatResponse.success === true){

				return response.status(200).json({
					chatCode	: chatResponse.result.codeHash,
					timeToInit	: chatResponse.result.timeToInit,
					usersQtd	: chatResponse.result.timeToInit
				});
			}
		});
	}
}