export interface ChatRoom {
	chatCode		: string,
	chatConnection	: WebSocket,
	chatElements	: Array<string>,
	elementsQtd		: number
}