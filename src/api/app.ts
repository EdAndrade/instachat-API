import express 				from 'express';
import cors					from 'cors';

//======ROUTES
import generateChatRoute	from './Routes/ChatGeneratorRoute';

const app 			= express();
const routerRoot	= '/api/';

app.use(`${routerRoot}/chat`, generateChatRoute);

app.use(cors());
app.use(express.json());
app.post('/users', (req, res) => {
	res.sendStatus(200);
});

export default app;