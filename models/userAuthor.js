// models/userAuthor.js
const db = require('../db'); // Adjust the path as needed

class UserAuthor {

    // Method to link a user to an author
    static async add(userId, authorId) {
        const result = await db.query(
            `INSERT INTO user_authors (user_id, author_id) VALUES ($1, $2) RETURNING *`,
            [userId, authorId]
        );
        return result.rows[0];
    }

    // Method to retrieve all authors followed by a specific user
    static async findByUserId(userId) {
        const result = await db.query(
            `SELECT author_id FROM user_authors WHERE user_id = $1`,
            [userId]
        );
        return result.rows;
    }

    // Additional methods as needed...
}

module.exports = UserAuthor;
