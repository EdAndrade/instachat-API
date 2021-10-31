import pool					from '../Database/connection';
import { CreateChatDTO }	from '../DTOs/ChatDTO';
import { ResponseDTO }		from '../DTOs/ResponseDTO';

export default class ChatRepository {

	constructor(){
		this.createChat = this.createChat.bind(this);
		this.getChat	= this.getChat.bind(this);
	}

	private rejectResponse(error: unknown): ResponseDTO {
		return {
			success: false,
			result: error
		};
	}

	createChat(chat: CreateChatDTO): Promise<ResponseDTO>{

		return new Promise( (resolve) => {

			try{

				pool.query(
					`INSERT INTO chats(code, users_qty, chat_name) VALUES(?,?,?)`,[
						chat.code,
						chat.usersQty,
						chat.name,
					],
		
					(error: unknown, results: any) => {
						if( (!!error) === true){
							resolve(this.rejectResponse(error));
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
				resolve(this.rejectResponse(error));
			}

		});
	}

	getChat(chatCode: string): Promise<ResponseDTO> {

		return new Promise( (resolve) => {

			

			pool.query(`SELECT * FROM chats WHERE code = ?`,[chatCode],(error, result, fields) => {
				
				try{
					
					if( ((!!error) === true) || result[0] === undefined){
						resolve(this.rejectResponse(error));
					}
					
					resolve({
						success: true,
						result: result[0]
					});

				}catch(error){
					resolve(this.rejectResponse(error));
				}
			});
			
		});
	}
}