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

		const chatRequest: Chat 		= request.body;
		const isChatRequestConsistent	= this.checkChatRequestConsistency(chatRequest);
		chatRequest.codeHash			= this.generateCodeHash(chatRequest, request);
		
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

	checkChatRequestConsistency(chat: Chat): boolean{

		const isChatRequestConsistent = 
		
			typeof(chat) === 'object' && (

				('timeToInit' in chat) && ('usersQty' in chat)

			) && ( 
				
				typeof(chat.timeToInit) === 'string' ) && ( typeof(chat.usersQty) === 'number'
				
			) && (

				/(\d{2})-(\d{2})-(\d{4})/.test(chat.timeToInit)
			);

		return isChatRequestConsistent;
	}

	generateCodeHash(chat: Chat, request: Request): string {

		const randomNumber			= Math.random();
		const dataToGenerateChat 	= `${JSON.stringify(chat)}${ckey.SECRET_KEY}${randomNumber}${request.headers.host}`;
		const codeHash = hashGenerator(dataToGenerateChat);

		return codeHash;
	}
}