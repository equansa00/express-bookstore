import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
    const [book, setBook] = useState({
        // Initialize the state with empty or placeholder values
        title: '',
        author: '',
        // Add other fields as needed
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the book data when the component mounts
        axios.get(`http://localhost:3000/books/${id}`)
            .then(response => {
                setBook(response.data.book); // Assuming the book data is in response.data.book
            })
            .catch(error => {
                console.error('Error fetching book:', error);
            });
    }, [id]); // Dependency array with id to refetch when id changes

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3000/books/${id}`, book);
            navigate('/'); // Redirect to the home page or another page
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleChange = (event) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input 
                type="text" 
                name="title" 
                value={book.title || ''} 
                onChange={handleChange} 
            />
            {/* Add other fields like author, pages, etc. similar to the title field */}
            <button type="submit">Update Book</button>
        </form>
    );
};

export default EditBook;


