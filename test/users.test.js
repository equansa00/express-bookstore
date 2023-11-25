// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app'); // Adjust this path to your app's entry point
// const expect = chai.expect;

// chai.use(chaiHttp);


// describe('Users Routes', function() {
//     // Test for POST route to create a user
//     it('should create a new user', function(done) {
//       chai.request(app)
//         .post('/users')
//         .send({ username: 'john_doe' })
//         .end(function(err, res) {
//           expect(res).to.have.status(201);
//           expect(res.body).to.have.property('user');
//           expect(res.body.user).to.have.property('username', 'john_doe');
//           done();
//         });
//     });
  
//     // Test for GET route to retrieve all users
//     it('should get all users', function(done) {
//       chai.request(app)
//         .get('/users')
//         .end(function(err, res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');
//           done();
//         });
//     });
  
//     // Test for PUT route to update a user
//     it('should update a user', function(done) {
//       chai.request(app)
//         .put('/users/1') // Replace 1 with an actual userId
//         .send({ username: 'jane_doe' })
//         .end(function(err, res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('user');
//           expect(res.body.user).to.have.property('username', 'jane_doe');
//           done();
//         });
//     });
  
//     // Test for DELETE route to delete a user
//     it('should delete a user', function(done) {
//       chai.request(app)
//         .delete('/users/1') // Replace 1 with an actual userId
//         .end(function(err, res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('message', 'User deleted');
//           done();
//         });
//     });
//   });
  