import ChatGeneratorModel 		from '../Models/ChatGeneratorModel';
import { Request, Response }	from 'express';
import { Chat }					from '../Types/ChatGenerator';

export default class ChatGeneratorController {

	private readonly chatGeneratorModel: ChatGeneratorModel;

	constructor(){
		this.chatGeneratorModel	= new ChatGeneratorModel();
	}

	async generateChat(request: Request, response: Response){

		return response.status(200);
	}
}