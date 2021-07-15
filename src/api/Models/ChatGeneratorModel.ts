import pool		from '../../config/database/connection';
import { Chat }	from '../Types/ChatGenerator';

export default class ChatGeneratorModel {

	saveGeneratedCodeInfo(chat: Chat): Promise<{success: boolean, result: unknown}>{

		return new Promise( (resolve, reject) => {

			pool.query(
				`INSERT INTO codes(code, users_quantity, beginTime) VALUES(?,?,?)`,[
					chat.codeHash,
					chat.UsersQuantity,
					chat.timeToInit
				],
	
				(error: any, results: any) => {
	
					if( (!!error) === true){
						return reject({
							success: false,
							result: error
						});
					}
	
					resolve({
						success: true,
						result: {
							...results
						}
					});
				}
			);
		});

		
	}
}