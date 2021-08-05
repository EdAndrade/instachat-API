import pool		from '../../config/database/connection';

export default class ChatStarterModel {

	getChatInfo(chatCode: string): Promise<{success: boolean, result: any}> {

		return new Promise( (resolve, reject) => {

			try{

				pool.query(`SELECT * FROM chatsinfo WHERE chatCode = ?`,[chatCode],(error, result, fields) => {
					
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