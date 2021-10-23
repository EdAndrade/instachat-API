export interface ChatRoom {
	chatCode		: string,
	chatElements	: Array<string>,
	usersQty		: number,
	timeToInit		: string,
	dateToInit		: string,
}

export interface ProcessResult{
	success: boolean,
	message: string
}