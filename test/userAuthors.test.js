const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp); 

describe('User Authors Routes', function() {
  let userId;
  let authorId;

  before(async function() {
    const userRes = await db.query(`
        INSERT INTO users (username, email, password) 
        VALUES ('TestUser', 'testuser@example.com', 'testpassword') 
        RETURNING id
    `); 
    const userId = userRes.rows[0].id;

    const authorRes = await db.query(`
        INSERT INTO authors (name) 
        VALUES ('Test Author') 
        RETURNING id
    `);
    const authorId = authorRes.rows[0].id;

describe('User Authors Routes', function() {
    it('should add an author to a user', function(done) {
      chai.request(app)
        .post('/users/1/authors/1') 
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'Author followed successfully');
          done();
        });
    });
  
    it('should get authors followed by a user', function(done) {
      chai.request(app)
        .get('/users/1/authors')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  
  after(async function() {
    await db.query(`DELETE FROM users WHERE id = $1`, [userId]);
    await db.query(`DELETE FROM authors WHERE id = $1`, [authorId]);
});
});
});
