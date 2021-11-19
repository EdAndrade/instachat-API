import { WebSocketServer } 			from 'ws';
import { ChatRoom, CreateChatRoom } from './Types/ChatTypes';
import ChatRepository 				from '../Data/Repositories/ChatRepository';

export default class ChatSocket {

	private chatRooms: Array<ChatRoom>;
	private readonly chatRepository: ChatRepository;

	constructor(socket: WebSocketServer){
		this.handleSocket 				= this.handleSocket.bind(this);
		this.checkChatRoomExistence 	= this.checkChatRoomExistence.bind(this);
		this.addNewElementToAChatRoom 	= this.addNewElementToAChatRoom.bind(this);
		this.addNewChatRoom 			= this.addNewChatRoom.bind(this);
		this.chatRooms 					= [];
		this.chatRepository 			= new ChatRepository();

		this.handleSocket(socket);
	}

	handleSocket(socket: WebSocketServer): void {

		socket.on("connection", async (ws, req) => {

			const chatCode = req.url?.replace('/', '');
			
			if(chatCode !== undefined){
				
				const chatRoomAlreadyExists = this.checkChatRoomExistence(chatCode);
				
				if(chatRoomAlreadyExists){
					this.addNewElementToAChatRoom(chatCode, ws);
				}else{

					const isDone = await this.addNewChatRoom(chatCode, ws);

					if(isDone === false)
						ws.terminate();
				}

			}else{
				ws.terminate();
			}	
				
			

			socket.on("message", data => {

				ws.send("recivied");
			});
		});
	}

	checkChatRoomExistence(chatCode: string): boolean {
		const chat = this.chatRooms.find( chatRoom => chatRoom.code === chatCode);
		return chat === undefined ? false : true;
	}

	addNewElementToAChatRoom(chatCode: string, ws: unknown): boolean {

		try{

			this.chatRooms.forEach( chatRoom => {
				if(chatRoom.code === chatCode)
					chatRoom.ws.push(ws);
			});

			return true;

		}catch{
			return false;
		}
	}

	async addNewChatRoom(chatCode: string, ws: unknown): Promise<boolean> {

		const response = await this.chatRepository.getChat(chatCode);
		
		if(response.success){

			console.log(response);
			// this.chatRooms.push({
			// 	code		: response.result.code,
			// 	users_qty	: response.result.users_qty,
			// 	chat_name	: response.result.chat_name,
			// 	ws: [ws]
			// });

			return true;
		}
		return false;
	}
}