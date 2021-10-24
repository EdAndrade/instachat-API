import { WebSocketServer } from 'ws';

export default class ChatSocket {

	private readonly _socket: WebSocketServer;

	constructor(socket: WebSocketServer){
		this._socket = socket;
		this.handleSocket(this._socket);
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