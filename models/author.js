// models/author.js
const db = require('../db');

class Author {
    static async create(name) {
        console.log("Creating author with name:", name);
        const result = await db.query(`INSERT INTO authors (name) VALUES ($1) RETURNING *`, [name]);
        return result.rows[0];
    }
    

    static async findAll() {
        const result = await db.query(`SELECT * FROM authors`);
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query(`SELECT * FROM authors WHERE id = $1`, [id]);
        return result.rows[0];
    }

    static async update(id, name) {
        const result = await db.query(`UPDATE authors SET name = $1 WHERE id = $2 RETURNING *`, [name, id]);
        return result.rows[0];
    }

    static async remove(id) {
        await db.query(`DELETE FROM authors WHERE id = $1`, [id]);
    }
}

module.exports = Author;
