import ChatRepository from '../Data/Repositories/ChatRepository';
import { Request, Response } from 'express';

export default class ChatController {

	private readonly chatRepository: ChatRepository;

	constructor(){
		this.chatRepository = new ChatRepository();
	}

	async createChat(request: Request, response: Response): Promise<Response> {

		try{

			const usersQuantity: number = request.body.usersQuantity;

			if(typeof(chatCode) !== 'number'){
				return res.status(400).json({
					success: false,

				})
			}
		}
	}
}