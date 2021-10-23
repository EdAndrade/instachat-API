import pool					from '../Database/connection';
import { CreateChatDTO }	from '../DTOs/ChatDTO';
import { ResponseDTO }		from '../DTOs/ResponseDTO';

export default class ChatRepository {

	createChat(chat: CreateChatDTO): Promise<ResponseDTO>{

		return new Promise( (resolve, reject) => {

			try{

				pool.query(
					`INSERT INTO chatsinfo(code, users_qty) VALUES(?,?)`,[
						chat.code,
						chat.usersQty,
					],
		
					(error: unknown, results: any) => {
						
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

	getChat(chatCode: string): Promise<ResponseDTO> {

		return new Promise( (resolve, reject) => {

			try{

				pool.query(`SELECT * FROM chatsinfo WHERE code = ?`,[chatCode],(error, result, fields) => {
					
					if((!!error) === true){

						reject({
							success: false,
							result: error
						});
					}

					resolve({
						success: true,
						result: result[0]
					});
				});

			}catch(error){

				reject({
					success: false,
					result: error
				});
			}
		});
	}
}