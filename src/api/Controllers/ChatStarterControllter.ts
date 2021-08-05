import { Request, Response }	from 'express';
import { ChatRoom }				from '../Types/ChatStarter';

export default class ChatStarterController {

	constructor(){
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

}

class handleChatRooms {

	private activeChatRooms: Array<ChatRoom>;

	constructor(){
		this.activeChatRooms = [];
	}

	private checkIfChatAlreadyExists(chatCode: string): boolean{
		const chatRoom = this.activeChatRooms.filter( chat => chatCode === chat.chatCode);
		return chatRoom.length > 0;
	}

	private getChatInfo(chatCode: string){

	}

	// private addNewChatRoom(chatCode: string, userQtd: number){

	// }

	private addNewElementToChatRoom(chatCode: string, newElement: string): boolean{
		let isDone = false;

		this.activeChatRooms.forEach( chatRoom => {
			if( (chatRoom.chatCode === chatCode) && (chatRoom.elementsQtd < chatRoom.chatElements.length) ){
				chatRoom.chatElements.push(newElement);
				isDone = true;
			}
		});

		return isDone;
	}
}