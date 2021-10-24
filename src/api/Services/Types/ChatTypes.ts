export interface ChatRoom {
	code: string,
	users_qty: number,
	name: string,
	ws: Array<WebSocket>
}

export interface CreateChatRoom {
	code: string,
	users_qty: number,
	name: string,
}