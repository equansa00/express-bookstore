import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<BookList />} />
                <Route path="/add" element={<AddBook />} />
                <Route path="/edit/:id" element={<EditBook />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
