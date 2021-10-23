export interface RequestChatDTO {
	usersQty		: number,
	name			: string
}

export interface CreateChatDTO {
	code			: string,
	usersQty		: number,
	name			: string
}

export interface ChatDTO {
	id				: number,
	code			: string,
	usersQty		: number,
	name			: string,
}