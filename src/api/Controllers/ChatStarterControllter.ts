import { Request, Response }	from 'express';
// import { ChatRoom }				from '../Types/ChatStarter';
import ChatStarterModel			from '../Models/ChatStarterModel';

export default class ChatStarterController {

	private readonly chatStarterModel: ChatStarterModel;

	constructor(){
		this.startChat			= this.startChat.bind(this);
		this.chatStarterModel	= new ChatStarterModel();
	}

	async startChat(request: Request, response: Response): Promise<Response>{
		
		const chatCode 				= request.body.chatCode;
		const isChatCodeConsitent	= this.checkChatcodeIntegrity(chatCode);

		return isChatCodeConsitent ? this.chatStarterModel.getChatInfo(chatCode).then( chatResponse => {

			if(chatResponse.success === true){
				
				return chatResponse.result ? response.status(200).json({
					chatCode	: chatResponse.result.chatCode,
					timeToInit	: chatResponse.result.timeToInit,
					dateToInit	: chatResponse.result.dateToInit,
				}) : response.sendStatus(404);

			}else{
				return response.sendStatus(500);
			}

		}) : response.sendStatus(400);
	}

	private checkChatcodeIntegrity(chatCode: string): boolean {
		const isChatCodeConsitent = typeof(chatCode) === 'string' && ( chatCode.length === 32 );
		return isChatCodeConsitent;
	}

}

// class HandleChatRooms {

// 	private activeChatRooms: Array<ChatRoom>;
	

// 	constructor(){
// 		this.activeChatRooms		= [];
		
// 		this.getChatInfo			= this.getChatInfo.bind(this);
// 		this.beginChatHandleProcess	= this.beginChatHandleProcess.bind(this);
// 	}

// 	private beginChatHandleProcess(chatCode: string): Promise<boolean>{

// 	}

// 	private checkIfChatAlreadyExists(chatCode: string): boolean{
// 		const chatRoom = this.activeChatRooms.filter( chat => chatCode === chat.chatCode);
// 		return chatRoom.length > 0;
// 	}

// 	private async getChatInfo(chatCode: string): Promise{
		
// 		return this.chatStarterModel.getChatInfo(chatCode).then( response => {

// 		});
// 	}

// 	// private addNewChatRoom(chatCode: string, userQtd: number){

// 	// }

// 	private addNewElementToChatRoom(chatCode: string, newElement: string): boolean{
// 		let isDone = false;

// 		this.activeChatRooms.forEach( chatRoom => {
// 			if( (chatRoom.chatCode === chatCode) && (chatRoom.elementsQtd < chatRoom.chatElements.length) ){
// 				chatRoom.chatElements.push(newElement);
// 				isDone = true;
// 			}
// 		});

// 		return isDone;
// 	}
// }