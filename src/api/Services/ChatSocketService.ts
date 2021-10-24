import { WebSocketServer } 			from 'ws';
import { ChatRoom, CreateChatRoom } from './Types/ChatTypes';
import ChatRepository 				from '../Data/Repositories/ChatRepository';

export default class ChatSocket {

	private chatRooms: Array<ChatRoom>;
	private readonly chatRepository: ChatRepository;

	constructor(socket: WebSocketServer){
		this.handleSocket = this.handleSocket.bind(this);
		this.handleSocket(socket);
		this.chatRooms = [];
		this.chatRepository = new ChatRepository();
	}

	handleSocket(socket: WebSocketServer): void {

		socket.on("connection", (ws, req) => {

			const url = req.url?.replace('/', '');
			const isConnectionValid = this.validateConnection(url);

			socket.on("message", data => {

				ws.send("recivied");
			});
		});
	}

	structureConnectionData(url: string): CreateChatRoom {
		const splitedUrl= url.split("-");

		const chatData: CreateChatRoom = {
			code: splitedUrl[0],
			users_qty: Number(splitedUrl[1]),
			name: splitedUrl[2]
		};

		return chatData;
	}

	validateConnection(url: string): CreateChatRoom | boolean {

		

		const chatRoomExists = this.checkChatRoomExistence(chatCode);

	}

	checkChatRoomExistence(chatCode: string): boolean{
		const chat = this.chatRooms.find( chatRoom => chatRoom.code === chatCode);
		return chat === undefined ? false : true;
	}

	// createNewChatRoom(chat: )
}