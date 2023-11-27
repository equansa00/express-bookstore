const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const db = require('../db');

chai.use(chaiHttp);

describe('Users Routes', function() {
    let userId;
  
    before(async function() {
      const userRes = await db.query(`
          INSERT INTO users (username, password) 
          VALUES ('john_doe', 'testpassword') 
          RETURNING id
      `);
      userId = userRes.rows[0].id;
    });

describe('Users Routes', function() {
  const uniqueUsername = `john_doe_${Date.now()}`;

  it('should create a new user', function(done) {
      chai.request(app)
        .post('/users')
        .send({ username: uniqueUsername, password: 'testpassword' })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.have.property('username', uniqueUsername);
          done();
        });
  });
      

    it('should get all users', function(done) {
      chai.request(app)
        .get('/users')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.users).to.be.an('array');
          done();
        });
    });
  
    it('should update a user', function(done) {
      chai.request(app)
          .put(`/users/${userId}`)
          .send({ username: 'updated_john' })
          .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('user');
              expect(res.body.user).to.have.property('username', 'updated_john');
              done();
          });
  });
  
  it('should delete a user', function(done) {
    chai.request(app)
        .delete(`/users/${userId}`)
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'User deleted successfully');
            done();
        });
});
});

after(async function() {
  await db.query(`DELETE FROM users WHERE id = $1`, [userId]);
});
});