import ChatRepository 			from '../Data/Repositories/ChatRepository';
import ChatControllerValidator	from '../Validations/Controllers/ChatControllerValidator';
import { Request, Response }	from 'express';
import { ValidationReturn }		from '../Validations/Types/ValidationReturn';
import GenerateHash				from '../Utils/GenerateHash';
import { CreateChatDTO } from '../Data/DTOs/ChatDTO';

export default class ChatController {

	private readonly chatRepository: ChatRepository;
	private readonly chatControllerValidator : ChatControllerValidator;

	constructor(){
		this.chatRepository 			= new ChatRepository();
		this.chatControllerValidator	= new ChatControllerValidator();
	}

	async createChat(request: Request, response: Response): Promise<Response> {

		try{

			const usersQuantity: number = request.body.usersQuantity;
			const usersQuantityValidation: ValidationReturn = this.chatControllerValidator.checkUserQuantity(usersQuantity);

			if(usersQuantityValidation.isValid){

				const chat: CreateChatDTO = {
					usersQty: usersQuantity,
					code: GenerateHash(`${new Date()}`)
				};

				this.chatRepository.createChat(chat).then( result => {
					return result.success ? response.status(200).json({chat}) : response.status(500);
				});

				return response.status(200).json({
					success: false,
					message: usersQuantityValidation.message
				});

			}else{

				return response.status(400).json({
					success: false,
					message: usersQuantityValidation.message
				});
			}

		}catch(error){
			return response.status(500);
		}
	}
}