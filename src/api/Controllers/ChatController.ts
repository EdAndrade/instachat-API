import ChatRepository 					from '../Data/Repositories/ChatRepository';
import ChatControllerValidator			from '../Validations/Controllers/ChatControllerValidator';
import { Request, Response }			from 'express';
import { ValidationReturn }				from '../Validations/Types/ValidationReturn';
import GenerateHash						from '../Utils/GenerateHash';
import { CreateChatDTO, RequestChatDTO }from '../Data/DTOs/ChatDTO';
import ckey								from 'ckey';

export default class ChatController {

	private readonly chatRepository: ChatRepository;
	private readonly chatControllerValidator : ChatControllerValidator;

	constructor(){
		this.chatRepository 			= new ChatRepository();
		this.chatControllerValidator	= new ChatControllerValidator();
		this.createChat					= this.createChat.bind(this);
	}

	async createChat(request: Request, response: Response): Promise<Response> {

		try{
			
			const requestBody: RequestChatDTO = request.body;
			const requestBodyValidation: ValidationReturn = this.chatControllerValidator.checkChatRequestBody(requestBody);

			if(requestBodyValidation.isValid){

				const chat: CreateChatDTO = {
					usersQty: requestBody.usersQty,
					code: GenerateHash(`${new Date()}${ckey.SECRET_KEY}`),
					name: requestBody.name
				};

				const result = await this.chatRepository.createChat(chat);

				return result.success ? response.status(200).json({
					success: true,
					data: chat
				}) : response.status(500).json({
					success: false,
					data: null
				});

			}else{

				return response.status(400).json({
					success: false,
					message: requestBodyValidation.message
				});
			}

		}catch(error){
			return response.status(500);
		}
	}
}