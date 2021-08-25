import { Request, Response }		from 'express';
import { ChatRoom, ProcessResult }	from '../Types/ChatStarter';
import ChatStarterModel				from '../Models/ChatStarterModel';

export default class ChatStarterController {

	private readonly chatStarterModel: ChatStarterModel;
	private readonly handleChatRooms: HandleChatRooms;

	constructor(){
		this.startChat			= this.startChat.bind(this);
		this.chatStarterModel	= new ChatStarterModel();
		this.handleChatRooms	= new HandleChatRooms();
	}

	async startChat(request: Request, response: Response): Promise<Response>{
		
		const chatCode 				= request.body.chatCode;
		const isChatCodeConsitent	= this.checkChatcodeIntegrity(chatCode);

		return isChatCodeConsitent ? this.chatStarterModel.getChatInfo(chatCode).then( chatResponse => {

			if(chatResponse.success === true){

				if(chatResponse.result){
					const processResult: ProcessResult = this.handleChatRooms.HandleProcess(chatResponse.result);

				}
				
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

class HandleChatRooms {

	private activeChatRooms: Array<ChatRoom> = [];

	constructor(){
		this.HandleProcess = this.HandleProcess.bind(this);
	}

	public HandleProcess(chatRoom: ChatRoom): ProcessResult {

		const chatAlreadyExists: boolean = this.checkIfChatAlreadyExists(chatRoom.chatCode);

		if(!chatAlreadyExists){

			this.activeChatRooms.push({
				chatCode	: chatRoom.chatCode,
				chatElements: [],
				usersQty	: chatRoom.usersQty,
				timeToInit	: chatRoom.timeToInit,
				dateToInit	: chatRoom.dateToInit
			});
		}

		const chat					= this.getChatByChatCode(chatRoom.chatCode);
		const newElement: string 	= this.generateNewUserName(chat.elementsQtd);

		return this.addNewElementToChatRoom(chatRoom.chatCode, newElement);
	}

	private verifyActivityChatTimeAndDate(chatTime: string, chatDate: string){

		const date: Date = new Date();
		const currentHour: number = date.getHours();
		const currentMinutes: number = date.getMinutes();
		const currentDay: number = date.getDay();

		const chatTimeSplited: Array<string> = chatTime.split(':');
		const chatDateSplited: Array<string> = chatDate.split('-');
		const chatHour = Number(chatTimeSplited[0]);
		const chatMinutes = Number(chatTimeSplited[1]);

		const chatInitTime: string = date.setHours()
	}

	private checkIfChatAlreadyExists(chatCode: string): boolean{
		const chatRoom = this.activeChatRooms.filter( chat => chatCode === chat.chatCode);
		return chatRoom.length > 0;
	}

	private getChatByChatCode(chatCode: string): any {
		return this.activeChatRooms.find( chat => chatCode === chat.chatCode);
	}

	// private addNewChatRoom(chatCode: string, userQtd: number){

	// }

	private generateNewUserName(chatQtd: number): string{

	}

	private addNewElementToChatRoom(chatCode: string, newElement: string): boolean{
		let isDone = false;

		this.activeChatRooms.forEach( chatRoom => {
			if( (chatRoom.chatCode === chatCode) && (chatRoom.usersQty < chatRoom.chatElements.length) ){
				chatRoom.chatElements.push(newElement);
				isDone = true;
			}
		});

		return isDone;
	}

}