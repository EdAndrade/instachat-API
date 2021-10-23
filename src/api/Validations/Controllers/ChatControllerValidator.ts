import { ValidationReturn } from '../Types/ValidationReturn';
import { RequestChatDTO }	from '../../Data/DTOs/ChatDTO';

export default class ChatControllerValidator {

	checkChatRequestBody(chat: RequestChatDTO): ValidationReturn {

		try{

			if(
				(typeof(chat.usersQty) === 'number') && 
				(chat.usersQty > 0) && 
				(typeof(chat.name) === 'string')
			){
				return {
					isValid: true,
					message: ''
				};
	
			}else{
	
				return {
					isValid: false,
					message: 'Por favor insira um número válido!'
				};
			}

		}catch(error){

			return {
				isValid: false,
				message: ''
			};
		}
	}
}