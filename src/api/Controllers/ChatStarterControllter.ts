import { Request, Response }	from 'express';

export default class ChatStarterController {

	async startChat(request: Request, response: Response): Promise<Response>{
		
		const chatCode 				= request.body.chatCode;
		const isChatCodeConsitent	= this.checkChatcodeIntegrity(chatCode);

		return isChatCodeConsitent ? response.sendStatus(200) : response.sendStatus(400);
	}

	checkChatcodeIntegrity(chatCode: string): boolean {
		const isChatCodeConsitent = typeof(chatCode) === 'string' && ( chatCode.length === 32 );
		return isChatCodeConsitent;
	}
}