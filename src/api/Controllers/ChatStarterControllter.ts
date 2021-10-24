// import { Request, Response }		from 'express';
// import { ChatRoom, ProcessResult }	from '../Types/ChatStarter';
// import ChatStarterModel				from '../Models/ChatStarterModel';

// export default class ChatStarterController {

// 	private readonly chatStarterModel: ChatStarterModel;
// 	private readonly handleChatRooms: HandleChatRooms;

// 	constructor(){
// 		this.startChat			= this.startChat.bind(this);
// 		this.chatStarterModel	= new ChatStarterModel();
// 		this.handleChatRooms	= new HandleChatRooms();
// 	}

// 	async startChat(request: Request, response: Response): Promise<Response>{
		
// 		const chatCode 				= request.body.chatCode;
// 		const isChatCodeConsitent	= this.checkChatcodeIntegrity(chatCode);

// 		return isChatCodeConsitent ? this.chatStarterModel.getChatInfo(chatCode).then( chatResponse => {

// 			if(chatResponse.success === true){

// 				if(chatResponse.result){
// 					const processResult: ProcessResult = this.handleChatRooms.HandleProcess(chatResponse.result);
// 					return response.status(200).json(processResult);
// 				}else{
// 					return response.sendStatus(404);
// 				}
				
// 			}else{
// 				return response.sendStatus(500);
// 			}

// 		}) : response.sendStatus(400);
// 	}

// 	private checkChatcodeIntegrity(chatCode: string): boolean {
// 		const isChatCodeConsitent = typeof(chatCode) === 'string' && ( chatCode.length === 32 );
// 		return isChatCodeConsitent;
// 	}

// }

// class HandleChatRooms {

// 	private activeChatRooms: Array<ChatRoom> = [];

// 	constructor(){
// 		this.HandleProcess = this.HandleProcess.bind(this);
// 	}

// 	public HandleProcess(chatRoom: ChatRoom): ProcessResult {

// 		const chatAlreadyExists: boolean = this.checkIfChatAlreadyExists(chatRoom.chatCode);

// 		if(!chatAlreadyExists){

// 			this.activeChatRooms.push({
// 				chatCode	: chatRoom.chatCode,
// 				chatElements: [],
// 				usersQty	: chatRoom.usersQty,
// 				timeToInit	: chatRoom.timeToInit,
// 				dateToInit	: chatRoom.dateToInit
// 			});
// 		}

// 		const chat										= this.getChatByChatCode(chatRoom.chatCode);
// 		const newElement: string 						= this.generateNewUserName(chat.elementsQtd);
// 		const newElementAdditionResult: ProcessResult	= this.addNewElementToChatRoom(chatRoom.chatCode, newElement);
// 		const chatValidation: ProcessResult				= this.isChatTimeAndDateValid(chatRoom.timeToInit, chatRoom.dateToInit);
		
// 		return chatValidation.success ? newElementAdditionResult : chatValidation;
// 	}

// 	private isChatTimeAndDateValid(chatTime: string, chatDate: string): ProcessResult{

// 		const date: Date = new Date();
// 		const currentHour: number = date.getHours();
// 		const currentMinutes: number = date.getMinutes();
// 		const currentDay: number = date.getDate();

// 		const chatTimeSplited: Array<string> = chatTime.split(':');
// 		const chatDateSplited: Array<string> = chatDate.split('-');
// 		const chatHour = Number(chatTimeSplited[0]);
// 		const chatMinutes = Number(chatTimeSplited[1]);
// 		const chatDay = Number(chatDateSplited[0]);

// 		const expiredChatResponse: ProcessResult = { success: false, message: 'Chat expirado!' };
// 		const validChatResponse: ProcessResult = { success: true, message: 'Chat válido!' };
// 		const minutesChatRangeVerification: boolean = ((chatMinutes >= 55) && (chatMinutes <= 59) && (chatMinutes - (60+currentMinutes) < 5))

// 		if( chatDay === currentDay){

// 			if(chatHour === currentHour){

// 				if( (currentMinutes - chatMinutes) < 0){

// 					return {
// 						success: false,
// 						message: 'Sala de chat ainda não foi iniciada'
// 					};
					
// 				}else if(currentMinutes - chatMinutes >= 5){
// 					return expiredChatResponse;
// 				}

// 			}else if(chatHour === (currentHour-1)){

// 				if(minutesChatRangeVerification){
// 					return validChatResponse;
// 				}
// 			}

// 		}else if( chatDay === (currentDay-1)){

// 			if( (chatHour === 23) && minutesChatRangeVerification){
// 				return validChatResponse;
// 			}else{
// 				return expiredChatResponse;
// 			}

// 		}else if(currentDay > chatDay){
			
// 			return {
// 				success: false,
// 				message: 'Sala de chat ainda não foi iniciada'
// 			};

// 		}else{
// 			return expiredChatResponse;
// 		}
// 	}

// 	private checkIfChatAlreadyExists(chatCode: string): boolean{
// 		const chatRoom = this.activeChatRooms.filter( chat => chatCode === chat.chatCode);
// 		return chatRoom.length > 0;
// 	}

// 	private getChatByChatCode(chatCode: string): any {
// 		return this.activeChatRooms.find( chat => chatCode === chat.chatCode);
// 	}

// 	private generateNewUserName(chatQtd: number): string{
// 		return `#@42${chatQtd}`
// 	}

// 	private addNewElementToChatRoom(chatCode: string, newElement: string): ProcessResult{
// 		let isDone = false;

// 		this.activeChatRooms.forEach( chatRoom => {
// 			if( (chatRoom.chatCode === chatCode) && (chatRoom.usersQty < chatRoom.chatElements.length) ){
// 				chatRoom.chatElements.push(newElement);
// 				isDone = true;
// 			}
// 		});

// 		return {
// 			success: isDone,
// 			message: isDone ? 'User added to chat' : 'Chat is already full!'
// 		};
// 	}

// }