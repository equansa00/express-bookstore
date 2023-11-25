const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust this path to your app's entry point
const expect = chai.expect;

chai.use(chaiHttp);

describe('Book Genres Routes', function() {
    it('should add a genre to a book', function(done) {
        chai.request(app)
          .post('/api/books/1/genres/1')
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
      

//   // Test for GET route to get genres of a book
//   it('should get genres of a book', function(done) {
//     chai.request(app)
//       .get('/books/1/genres') // Replace 1 with an actual bookId
//       .end(function(err, res) {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an('array');
//         done();
//       });
//   });
});

