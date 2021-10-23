import express 				from 'express';
import cors					from 'cors';

//======ROUTES
import ChatRoute	from './Routes/ChatRoute';

const app 			= express();
const routerRoot	= '/api/';

app.use(cors());
app.use(express.json());

app.use(`${routerRoot}chat`, ChatRoute);

export default app;