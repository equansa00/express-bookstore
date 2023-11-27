const db = require('../db');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Book Genres Routes', function() {
  before(async function() {
    await db.query(
      `INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year) 
       VALUES ('0908070605', 'http://a.co/eobPtX2', 'Test Author', 'english', 300, 'Test Publisher', 'Test Book', 2021)`
    );
    await db.query(
      `INSERT INTO genres (id, name) VALUES (1, 'Test Genre')`
    );
  });

describe('Book Genres Routes', function() {
  it('should add a genre to a book', function(done) {
      chai.request(app)
        .post('/book-genres/0908070605/genres/1') // Make sure this matches the route in your Express app
        .end(function(err, res) {
            if (err) {
              done(err);
              return;
            }
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message', 'Genre added to book');
            done();
          });
      });
      

it('should get genres of a book', function(done) {
    chai.request(app)
      .get('/book-genres/1/genres')
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('genres').that.is.an('array');
        done();
      });
  });
});

after(async function() {
  await db.query(`DELETE FROM book_genres WHERE isbn = '0908070605'`);
  await db.query(`DELETE FROM books WHERE isbn = '0908070605'`);
  await db.query(`DELETE FROM genres WHERE id = 1`);
});
});