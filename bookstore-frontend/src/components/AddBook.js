// AddBook.js
import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [book, setBook] = useState({
        isbn: '',
        amazon_url: '',
        author: '',
        title: '',
        publisher: '',
        year: '',
        language: '', // Optional
        pages: '', // Optional
    });
    const [errors, setErrors] = useState([]);
    const [submissionError, setSubmissionError] = useState(''); // Additional state for submission error

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form data being submitted:", book);

        // Clear previous errors
        setErrors([]);
        setSubmissionError('');

        // Front-end validation
        const requiredFields = ['isbn', 'amazon_url', 'author', 'title', 'publisher', 'year'];
        const isFormValid = requiredFields.every(field => book[field] !== '' && book[field] !== null);
    
        if (!isFormValid) {
            setSubmissionError('Please fill in all required fields.');
            return;
        }
        
        // Prepare data for submission
        const formData = { ...book };
        formData.year = formData.year ? parseInt(formData.year, 10) : null;
        formData.pages = formData.pages ? parseInt(formData.pages, 10) : null;

        axios.post('http://localhost:3000/books', formData)
            .then(response => {
                console.log('Book added:', response.data);
                // Reset form or redirect as needed
                setBook({
                    isbn: '',
                    amazon_url: '',
                    author: '',
                    title: '',
                    publisher: '',
                    year: '',
                    language: '',
                    pages: '',
                });
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    console.error('Error adding book:', error);
                    setSubmissionError('An error occurred while adding the book.');
                }
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(`Field changed - Name: ${name}, Value: ${value}`);
        setBook({ ...book, [name]: value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input type="text" name="isbn" value={book.isbn} onChange={handleChange} placeholder="ISBN" />
                <input type="text" name="amazon_url" value={book.amazon_url} onChange={handleChange} placeholder="Amazon URL" />
                <input type="text" name="author" value={book.author} onChange={handleChange} placeholder="Author" />
                <input type="text" name="title" value={book.title} onChange={handleChange} placeholder="Title" />
                <input type="text" name="publisher" value={book.publisher} onChange={handleChange} placeholder="Publisher" />
                <input type="text" name="year" value={book.year} onChange={handleChange} placeholder="Year" />
                <input type="text" name="language" value={book.language} onChange={handleChange} placeholder="Language" />
                <input type="text" name="pages" value={book.pages} onChange={handleChange} placeholder="Pages" />
                <button type="submit">Add Book</button>
            </form>
            {submissionError && <p className="error">{submissionError}</p>}
            {errors.length > 0 && (
                <div>
                    <h4>Validation Errors:</h4>
                    <ul>
                        {errors.map((error, index) => <li key={index}>{error.message}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AddBook;
