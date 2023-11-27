const db = require('../db');

class User {
    static async create(username, password) {
        try {
            const result = await db.query(`
                INSERT INTO users (username, password) 
                VALUES ($1, $2) 
                RETURNING *
            `, [username, password]); 
            return result.rows[0];
        } catch (err) {
            console.error("Error in User.create:", err, "\nStack:", err.stack);
            throw err; 
        }
    }

    
    static async findAll() {
        const result = await db.query(`SELECT id, username FROM users`);
        return result.rows;
    }
    
    static async findById(id) {
        const result = await db.query(`SELECT id, username FROM users WHERE id = $1`, [id]);
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

