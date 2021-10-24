module.exports = {
	"up":
		`CREATE TABLE IF NOT EXITS chats(
			id INT AUTO_INCREMENT PRIMARY_KEY,
			code VARCHAR(100),
			users_qty INT,
			name VARCHAR(128),
		`,

	"down": "DROP TABLE chats"
};