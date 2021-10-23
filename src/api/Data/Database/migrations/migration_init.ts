import pool 			from '../connection';
import mysql_migrations	from 'mysql-migrations';

mysql_migrations.init(pool, `${__dirname}/migrations_list`, () => {
	console.log("Migration process finished!");
});