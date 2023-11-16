let DB_URI;

if (process.env.NODE_ENV === "test") {
  
  DB_URI = "postgresql://equansa00:1Chriss1@localhost/books_test";
} else {
 
  DB_URI = process.env.DATABASE_URL || "postgresql://equansa00:1Chriss1@localhost/books";
}

module.exports = { DB_URI };
