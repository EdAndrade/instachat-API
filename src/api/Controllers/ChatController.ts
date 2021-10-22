import ChatRepository from '../Data/Repositories/ChatRepository';

export default class ChatController {

	private readonly chatRepository: ChatRepository;

	constructor(){
		this.chatRepository = new ChatRepository();
	}

}