import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:3000/users') // Adjust URL as needed
             .then(response => {
                 setUsers(response.data.users); // Adjust according to response structure
             })
             .catch(error => {
                 console.error('Error fetching users:', error);
             });
    };

    const handleAddUser = () => {
        axios.post('http://localhost:3000/users', { username: newUser }) // Adjust URL as needed
             .then(response => {
                 setUsers([...users, response.data.user]); // Adjust according to response structure
                 setNewUser(''); // Reset input field
             })
             .catch(error => {
                 console.error('Error adding user:', error);
             });
    };

    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:3000/users/${id}`) // Adjust URL as needed
             .then(response => {
                 // Filter out the deleted user from the users state
                 setUsers(users.filter(user => user.id !== id));
             })
             .catch(error => {
                 console.error('Error deleting user:', error);
             });
    };

    return (
        <div>
            <h2>Manage Users</h2>
            <input 
                type="text" 
                value={newUser} 
                onChange={(e) => setNewUser(e.target.value)} 
                placeholder="New Username" 
            />
            <button onClick={handleAddUser}>Add User</button>

            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
