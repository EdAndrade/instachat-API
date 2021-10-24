import app 					from './app';
import {WebSocketServer}	from 'ws';
import ChatSocketService 	from './Services/ChatSocketService';

new ChatSocketService(new WebSocketServer({port: 8080}));

app.listen(8085, ()=> {
	console.log("Server started on port 8085");
});

