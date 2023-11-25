import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/books')
            .then(response => {
                // Assuming the response data contains an array of books under a 'books' key
                setBooks(response.data.books);
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error('Error fetching books:', error);
            });
    }, []); // Don't forget this closing array for useEffect dependencies

    return (
        <div>
            <h2>Book List</h2>
            <Link to="/add">Add a New Book</Link>
            <ul>
                {books.map(book => (
                    <li key={book.isbn}>
                        {book.title} by {book.author}
                        <Link to={`/edit/${book.isbn}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
