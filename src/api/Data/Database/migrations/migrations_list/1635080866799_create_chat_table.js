module.exports = {
	"up":
		`CREATE TABLE IF NOT EXISTS chats(
			id INT AUTO_INCREMENT PRIMARY KEY,
			code VARCHAR(100),
			users_qty INT,
			chat_name VARCHAR(128)
		)`,

	"down": "DROP TABLE chats"
};