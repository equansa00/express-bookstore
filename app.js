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

// Use Routes
app.use("/books", bookRoutes);
app.use('/authors', authorRoutes);
app.use('/userAuthors', userAuthorRoutes);
app.use('/api', bookGenresRoutes);

// 404 handler
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

// general error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;
