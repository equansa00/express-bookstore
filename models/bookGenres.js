const db = require('../db'); 

class BookGenre {
    static async addGenreToBook(isbn, genreId) {
        try {
            console.log(`Query to add genre ${genreId} to book ${isbn}`);
            const result = await db.query(
                `INSERT INTO book_genres (isbn, genre_id) VALUES ($1, $2) RETURNING *`,
                [isbn, genreId]
            );
            console.log(`Query result:`, result.rows[0]);
            return result.rows[0];
        } catch (err) {
            console.error(`Error in addGenreToBook with isbn: ${isbn} and genreId: ${genreId}`, err);
            throw err;
        }
    }
    

static async getGenresOfBook(isbn) {
    try {
        console.log(`Fetching genres for book ${isbn}`);
        const result = await db.query(
            `SELECT genres.id, genres.name FROM book_genres 
             JOIN genres ON genres.id = book_genres.genre_id 
             WHERE book_genres.isbn = $1`, 
            [isbn]
        );
        return result.rows;
    } catch (err) {
        console.error(`Error in getGenresOfBook with isbn: ${isbn}`, err);
        throw err;
    }
}
    
}

module.exports = BookGenre;
