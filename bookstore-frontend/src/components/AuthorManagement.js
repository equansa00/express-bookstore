import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorManagement = () => {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState('');

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = () => {
        axios.get('http://localhost:3000/authors') // Adjust URL as needed
             .then(response => {
                 setAuthors(response.data.authors); // Adjust according to response structure
             })
             .catch(error => {
                 console.error('Error fetching authors:', error);
             });
    };

    const handleAddAuthor = () => {
        axios.post('http://localhost:3000/authors', { name: newAuthor }) // Adjust URL as needed
             .then(response => {
                 setAuthors([...authors, response.data.author]); // Adjust according to response structure
                 setNewAuthor(''); // Reset input field
             })
             .catch(error => {
                 console.error('Error adding author:', error);
             });
    };

    const handleDeleteAuthor = (id) => {
        axios.delete(`http://localhost:3000/authors/${id}`) // Adjust URL as needed
             .then(response => {
                 // Filter out the deleted author from the authors state
                 setAuthors(authors.filter(author => author.id !== id));
             })
             .catch(error => {
                 console.error('Error deleting author:', error);
             });
    };

    return (
        <div>
            <h2>Manage Authors</h2>
            <input 
                type="text" 
                value={newAuthor} 
                onChange={(e) => setNewAuthor(e.target.value)} 
                placeholder="New Author Name" 
            />
            <button onClick={handleAddAuthor}>Add Author</button>

            <ul>
                {authors.map(author => (
                    <li key={author.id}>
                        {author.name}
                        <button onClick={() => handleDeleteAuthor(author.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorManagement;
