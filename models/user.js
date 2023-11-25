// models/user.js
const db = require('../db');

class User {
    static async create(username) {
        const result = await db.query(`INSERT INTO users (username) VALUES ($1) RETURNING *`, [username]);
        return result.rows[0];
    }

    static async findAll() {
        const result = await db.query(`SELECT * FROM users`);
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return result.rows[0];
    }

    static async update(id, username) {
        const result = await db.query(`UPDATE users SET username = $1 WHERE id = $2 RETURNING *`, [username, id]);
        return result.rows[0];
    }

    static async remove(id) {
        await db.query(`DELETE FROM users WHERE id = $1`, [id]);
    }
}

module.exports = User;

