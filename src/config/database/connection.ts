import { createPool } from 'mysql';

export default createPool({
	port			: 3306,
	host			: 'localhost',
	user			: 'root',
	password		: 'root',
	database		: 'instachat',
	connectionLimit	: 10,
});