// In BookDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookDetail = ({ isbn }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${isbn}`)
      .then(response => setBook(response.data.book))
      .catch(error => console.error('Error fetching book:', error));
  }, [isbn]);

  if (!book) return <div>Loading...</div>;
  return (
    <div>
      <h1>{book.title}</h1>
      {/* Render other book details */}
    </div>
  );
};

export default BookDetail;
