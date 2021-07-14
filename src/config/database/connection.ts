import { createPool }	from 'mysql';
import { config } 		from 'dotenv';

config();

export default createPool({
	port			: Number(process.env.DB_PORT),
	host			: process.env.DB_HOST,
	user			: process.env.DB_USER,
	password		: process.env.DB_PASS,
	database		: process.env.DB_NAME,
	connectionLimit	: 10,
});