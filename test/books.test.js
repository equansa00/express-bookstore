process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const expect = chai.expect;
const request = require('supertest')(server); 

chai.use(chaiHttp);

describe('Bookstore Test Suite', () => {
  const testIsbn = '0908070605'; 

  describe('POST /books', () => {
    it('should create a new book', (done) => {
      chai.request(server)
          .post('/books')
          .send({
              isbn: '0908070605',
              amazon_url: 'http://a.co/eobPtX2',
              author: 'Test Author',
              language: 'english',
              pages: 300,
              publisher: 'Test Publisher',
              title: 'Test Book',
              year: 2021
          })
          .end((err, res) => {
              res.should.have.status(201);
              done();
        
        });
        });
    });
  
    describe('/GET books', () => {
      it('it should GET all the books', (done) => {
          chai.request(server)
              .get('/books')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.books.should.be.a('array');
                  done();
          });
      });
    });

    describe('GET /books/:isbn', () => {
      it('should GET a book by ISBN', (done) => {
        chai.request(server)
            .get(`/books/${testIsbn}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
          });
      });

      it('should not GET a book with a non-existent ISBN', (done) => {
        const isbn = 'nonexistent';
        chai.request(server)
          .get(`/books/${isbn}`)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });

    describe('PUT /books/:isbn', () => {
      it('it should UPDATE a book given the isbn', (done) => {
        let updatedBookData = {
            isbn: '0908070605',
            amazon_url: 'http://a.co/eobPtX2', 
            author: "New Author",
            title: "New Title",
            language: "english",
            pages: 305,
            publisher: "Updated Publisher",
            year: 2022
        };
    
        chai.request(server)
        .put(`/books/${updatedBookData.isbn}`)
        .send(updatedBookData)
        .end((err, res) => {
            if (err) {
                console.error('Error in PUT /books/:isbn:', err.message);
                done(err);
            } else {
                res.should.have.status(200);
                done();
            }
          });
      });


    it('should not update a book with invalid data', (done) => {
      const isbn = '432187650';
      chai.request(server)
        .put(`/books/${isbn}`)
        .send({        
          title: 123,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  
  describe('DELETE /books/:isbn', () => {
    it('should DELETE a book given the isbn', (done) => {
      request
        .delete(`/books/${testIsbn}`)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          done();
        });
        });
    });

    describe('PATCH /books/:isbn', () => {
      it('should partially update a book', (done) => {
        chai.request(server)
          .patch(`/books/${testIsbn}`)
          .send({ title: 'Partially Updated Title' })
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              res.should.have.status(200);
              done();
            }
          });
      });
    });
  });