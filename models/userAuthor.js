const db = require('../db');

class UserAuthor {
    
    static async followAuthor(userId, authorId) {
        const result = await db.query(
            `INSERT INTO user_authors (user_id, author_id) VALUES ($1, $2) RETURNING *`,
            [userId, authorId]
        );
        return result.rows[0];
    }

    static async getFollowedAuthors(userId) {
        const result = await db.query(
            `SELECT * FROM authors WHERE id IN (SELECT author_id FROM user_authors WHERE user_id = $1)`,
            [userId]
        );
        return result.rows;
    }
}

module.exports = UserAuthor;
