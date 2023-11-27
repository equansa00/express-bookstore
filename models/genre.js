const db = require('../db'); 

class Genre {
    static async create(name) {
        try {
            const result = await db.query(`INSERT INTO genres (name) VALUES ($1) RETURNING *`, [name]);
            return result.rows[0];
        } catch (err) {
            console.error("Error in Genre.create: ", err);
            throw err;
        }
    }

    static async findAll() {
        const result = await db.query(`SELECT * FROM genres`);
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query(`SELECT * FROM genres WHERE id = $1`, [id]);
        return result.rows[0];
    }

    static async update(id, name) {
        const result = await db.query(`UPDATE genres SET name = $1 WHERE id = $2 RETURNING *`, [name, id]);
        return result.rows[0];
    }

    static async remove(id) {
        await db.query(`DELETE FROM genres WHERE id = $1`, [id]);
    }
}

module.exports = Genre;
