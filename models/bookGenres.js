// models/bookGenres.js
const db = require('../db'); // Adjust the path as needed

class BookGenre {
    // Method to add a genre to a book
    static async addGenreToBook(isbn, genreId) {
        const result = await db.query(
            `INSERT INTO book_genres (isbn, genre_id) VALUES ($1, $2) RETURNING *`,
            [isbn, genreId]
        );
        return result.rows[0];
    }

    // Method to get all genres for a specific book
    static async getGenresOfBook(isbn) {
        const result = await db.query(
            `SELECT genres.id, genres.name FROM book_genres JOIN genres ON genres.id = book_genres.genre_id WHERE isbn = $1`,
            [isbn]
        );
        return result.rows;
    }

    // Additional methods as needed...
}

module.exports = BookGenre;
