// AddBook.js (similar structure for EditBook.js)
import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [book, setBook] = useState({ 
        title: '', 
        author: '', 
        // Add other fields as needed, for example:
        // language: '',
        // pages: 0,
        // publisher: '',
        // year: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/books', book)
            .then(response => console.log(response))
            .catch(error => console.error('Error adding book: ', error));
    };

    const handleChange = (event) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={book.title} onChange={handleChange} />
            <input type="text" name="author" value={book.author} onChange={handleChange} />
            {/* Add other input fields here */}
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;
