import express from 'express';

const app = express();

// app.use(express.json());
app.post('/users', (req, res) => {
	res.sendStatus(200);
});

export default app;