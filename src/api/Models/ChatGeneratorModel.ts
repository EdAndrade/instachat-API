import pool		from '../../config/database/connection';
import { Chat }	from '../Types/ChatGenerator';

export default class ChatGeneratorModel {

	saveGeneratedCodeInfo(chat: Chat): Promise<{ success: boolean, result: any }>{

		return new Promise( (resolve, reject) => {

			try{

				pool.query(
					`INSERT INTO chatsinfo(code, users_qty, dateToInit, timeToInit) VALUES(?,?,?,?)`,[
						chat.codeHash,
						chat.usersQty,
						chat.dateToInit,
						chat.timeToInit
					],
		
					(error: any, results: any) => {
						
						if( (!!error) === true){
							reject({
								success: false,
								result: error
							});
						}

						resolve({
							success: true,
							result: {
								id: results.id,
								...chat
							}
						});
					}
				);

			}catch(error){
				
				reject({
					success: false,
					result: error
				});
			}

		});
	}
}