import { WebSocketServer } from 'ws';

export default class ChatSocket {

	constructor(socket: WebSocketServer){
		this.handleSocket(socket);
	}

	handleSocket(socket: WebSocketServer): void {

		socket.on("connection", ws => {
			console.log("new clientConnected");

			socket.on("message", data => {

				ws.send("recivied");
			});
		});
	}
}