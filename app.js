const express = require("express");
const app = express();
app.use(express.json());

const ExpressError = require("./expressError");
const cors = require('cors');
app.use(cors());

// Routes requires
const bookRoutes = require("./routes/books");
const authorRoutes = require('./routes/authors');
const bookGenresRoutes = require('./routes/bookGenres');
const userAuthorRoutes = require('./routes/userAuthors');
const genresRoutes = require('./routes/genres'); 
const userAuthorsRoutes = require('./routes/userAuthors');
const userRoutes = require('./routes/users'); 


// Use Routes
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/book-genres', bookGenresRoutes);
app.use('/userAuthors', userAuthorRoutes);
app.use('/genres', genresRoutes);
app.use('/users/:userId/authors', userAuthorsRoutes);
app.use('/users', userRoutes);

// general error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    error: err,
    message: err.message
  });
});

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

module.exports = app;

