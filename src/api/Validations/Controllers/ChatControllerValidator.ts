import { ValidationReturn } from '../Types/ValidationReturn';

export default class ChatControllerValidator {

	checkUserQuantity(userQuantity: number): ValidationReturn{
		if(
			(typeof(userQuantity) === 'number') && 
			(userQuantity > 0)
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
	}
}