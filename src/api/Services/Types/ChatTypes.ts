export interface ChatRoom {
	code: string,
	users_qty: number,
	chat_name: string,
	ws: Array<any>
}

export interface CreateChatRoom {
	code: string,
	users_qty: number,
	name: string,
}