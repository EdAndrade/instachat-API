export interface CreateChatDTO {
	usersQty		: number,
}

export interface ChatDTO {
	id				: number,
	codeHash		: string,
	usersQty		: number,
	timeToInit		: string,
	dateToInit		: string
}