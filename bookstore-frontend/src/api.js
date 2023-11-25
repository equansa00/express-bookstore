import axios from 'axios';

const getBookByIsbn = async (isbn) => {
  try {
    const response = await axios.get(`http://localhost:3000/books/${isbn}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

export { getBookByIsbn };
