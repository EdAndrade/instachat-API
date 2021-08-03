import { Request, Response }	from 'express';
import { ChatRoom }				from '../Types/ChatStarter';

export default class ChatStarterController {

	private activeChatRooms: Array<ChatRoom>;

	constructor(){
		this.activeChatRooms = [];
		this.startChat = this.startChat.bind(this);
	}

	async startChat(request: Request, response: Response): Promise<Response>{
		
		const chatCode 				= request.body.chatCode;
		const isChatCodeConsitent	= this.checkChatcodeIntegrity(chatCode);

		return isChatCodeConsitent ? response.sendStatus(200) : response.sendStatus(400);
	}

	private checkChatcodeIntegrity(chatCode: string): boolean {
		const isChatCodeConsitent = typeof(chatCode) === 'string' && ( chatCode.length === 32 );
		return isChatCodeConsitent;
	}
	
	private checkIfChatAlreadyExists(chatCode: string){
		
	}
}