export default class ChatControllerValidator {

	checkUserQuantity(userQuantity: number): {isValid: boolean, message: string}{
		if(
			(typeof(userQuantity) === 'number') && 
			(userQuantity > 0)
		){
			return {

			}
		}
	}
}