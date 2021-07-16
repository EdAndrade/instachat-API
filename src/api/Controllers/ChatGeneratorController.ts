import ChatGeneratorModel 		from '../Models/ChatGeneratorModel';
import { Request, Response }	from 'express';
import { Chat }					from '../Types/ChatGenerator';
import ckey						from 'ckey';
import hashGenerator			from '../Services/GenerateHashService';

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

		if(isChatRequestConsistent){

			const randomNumber			= Math.random();
			const dataToGenerateChat 	= 
				`${String(chatRequest.usersQty)}${ckey.SECRET_KEY}${randomNumber}${chatRequest.timeToInit}`;

			chatRequest.codeHash = hashGenerator(dataToGenerateChat);
		}
		
		return isChatRequestConsistent ? this.chatGeneratorModel.saveGeneratedCodeInfo(chatRequest).then( chatResponse => {

			if(chatResponse.success === true){
				
				return response.status(200).json({
					chatCode	: chatResponse.result.codeHash,
					timeToInit	: chatResponse.result.timeToInit,
					usersQty	: chatResponse.result.usersQty
				});

			}else{
				return response.status(500).json(chatResponse.result);
			}
		}) : response.sendStatus(400);
	}
}