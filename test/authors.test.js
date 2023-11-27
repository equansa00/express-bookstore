const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('POST /authors', function() {
    it('should create a new author', function(done) {
      chai.request(app)
        .post('/authors')
        .send({ name: 'New Author' })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body.author).to.have.property('name', 'New Author');
          done();
        });
    });
  });
  
  describe('GET /authors', function() {
    it('should get all authors', function(done) {
      chai.request(app)
        .get('/authors')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.authors).to.be.an('array');
          done();
        });
    });
  });
  
  describe('GET /authors/:id', function() {
    let createdAuthorId;

    before(function(done) {
        chai.request(app)
            .post('/authors')
            .send({ name: 'Test Author' })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                createdAuthorId = res.body.author.id;
                done();
            });
    });

    it('should get a single author', function(done) {
        chai.request(app)
            .get(`/authors/${createdAuthorId}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.author).to.have.property('id', createdAuthorId);
                done();
            });
    });
});

  
describe('PUT /authors/:id', function() {
  let createdAuthorId;

  before(function(done) {
      // Create an author first
      chai.request(app)
          .post('/authors')
          .send({ name: 'Author for PUT Test' })
          .end(function(err, res) {
              expect(res).to.have.status(201);
              createdAuthorId = res.body.author.id;
              done();
          });
  });

  it('should update an author', function(done) {
      chai.request(app)
          .put(`/authors/${createdAuthorId}`)
          .send({ name: 'Updated Author' })
          .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              expect(res.body.author).to.have.property('name', 'Updated Author');
              done();
          });
  });
});

  
describe('DELETE /authors/:id', function() {
    it('should delete an author', function(done) {
      chai.request(app)
        .delete('/authors/1')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'Author deleted');
          done();
        });
    });
  });
  