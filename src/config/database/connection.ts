import { createPool }	from 'mysql';
import ckey 			from 'ckey';

export default createPool({
	port			: Number(ckey.DB_PORT),
	host			: ckey.DB_HOST,
	user			: ckey.DB_USER,
	password		: ckey.DB_PASS,
	database		: ckey.DB_NAME,
	connectionLimit	: 10,
});