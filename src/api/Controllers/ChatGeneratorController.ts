import ChatGeneratorModel 		from '../Models/ChatGeneratorModel';
import { Request, Response }	from 'express';
import { Chat }					from '../Types/ChatGenerator';

export default class ChatGeneratorController {

	private readonly chatGeneratorModel: ChatGeneratorModel;

	constructor(){
		this.chatGeneratorModel	= new ChatGeneratorModel();
		this.generateChat		= this.generateChat.bind(this);
	}

	async generateChat(request: Request, response: Response): Promise<Response>{

		const chatRequest: Chat = request.body;
		
		const isChatRequestConsistent = (

			typeof(chatRequest) === 'object' && (
				('timeToInit' in chatRequest) && ('usersQty' in chatRequest)
			)

		) ? true : false;
		
		return isChatRequestConsistent ? this.chatGeneratorModel.saveGeneratedCodeInfo(chatRequest).then( chatResponse => {

			if(chatResponse.success === true){
				
				return response.status(200).json({
					chatCode	: 'dafsdfasffsdfasdf',
					timeToInit	: chatResponse.result.timeToInit,
					usersQty	: chatResponse.result.usersQty
				});

			}else{
				return response.status(500).json(chatResponse.result);
			}
		}) : response.sendStatus(400);
	}
}