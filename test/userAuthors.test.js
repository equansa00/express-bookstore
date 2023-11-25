// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app'); // Adjust the path as needed to import your Express app
// const expect = chai.expect;

// chai.use(chaiHttp); 

// describe('User Authors Routes', function() {
//     // Test for POST route to add an author to a user
//     it('should add an author to a user', function(done) {
//       chai.request(app)
//         .post('/users/1/authors/1') // Replace with actual userId and authorId
//         .end(function(err, res) {
//           expect(res).to.have.status(201);
//           expect(res.body).to.have.property('message', 'Author followed successfully');
//           done();
//         });
//     });
  
//     // Test for GET route to get authors followed by a user
//     it('should get authors followed by a user', function(done) {
//       chai.request(app)
//         .get('/users/1/authors') // Replace 1 with an actual userId
//         .end(function(err, res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');
//           done();
//         });
//     });
//   });
  