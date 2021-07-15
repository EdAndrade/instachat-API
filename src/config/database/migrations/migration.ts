import pool 			from '../connection';
import mysql_migrations	from 'mysql-migrations';

mysql_migrations.init(pool, `${__dirname}/migrations`, () => {
	console.log("Migrations process done!");
});