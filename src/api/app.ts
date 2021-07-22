import express 				from 'express';
import cors					from 'cors';

//======ROUTES
import generateChatRoute	from './Routes/ChatGeneratorRoute';
import startChatRoute		from './Routes/ChatStarterRoute';

const app 			= express();
const routerRoot	= '/api/';

app.use(cors());
app.use(express.json());

app.use(`${routerRoot}chat`, generateChatRoute);
app.use(`${routerRoot}chat`, startChatRoute);

export default app;