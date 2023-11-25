// components/GenreManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenreManagement = () => {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/genres')  // Adjust URL as needed
            .then(response => {
                setGenres(response.data.genres); // Adjust according to response structure
            })
            .catch(error => {
                console.error('Error fetching genres:', error);
            });
    }, []);

    const handleAddGenre = () => {
        axios.post('http://localhost:3000/genres', { name: newGenre })  // Adjust URL as needed
            .then(response => {
                setGenres([...genres, response.data.genre]); // Adjust according to response structure
                setNewGenre(''); // Reset input field
            })
            .catch(error => {
                console.error('Error adding genre:', error);
            });
    };

    return (
        <div>
            <h2>Manage Genres</h2>
            <input 
                type="text" 
                value={newGenre} 
                onChange={(e) => setNewGenre(e.target.value)} 
                placeholder="New Genre Name" 
            />
            <button onClick={handleAddGenre}>Add Genre</button>

            <ul>
                {genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
            </ul>
        </div>
    );
};

export default GenreManagement;
