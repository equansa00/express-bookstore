// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app'); // Adjust this path to your app's entry point
// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('Genres Routes', function() {
//   // Test for POST route to add a genre
//   it('should add a new genre', function(done) {
//     chai.request(app)
//       .post('/genres')
//       .send({ name: 'Fantasy' })
//       .end(function(err, res) {
//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property('genre');
//         expect(res.body.genre).to.have.property('name', 'Fantasy');
//         done();
//       });
//   });

//   // Test for GET route to retrieve all genres
//   it('should get all genres', function(done) {
//     chai.request(app)
//       .get('/genres')
//       .end(function(err, res) {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an('array');
//         done();
//       });
//   });

//   // Test for PUT route to update a genre
//   it('should update a genre', function(done) {
//     chai.request(app)
//       .put('/genres/1') // Replace 1 with an actual genreId
//       .send({ name: 'Sci-Fi' })
//       .end(function(err, res) {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('genre');
//         expect(res.body.genre).to.have.property('name', 'Sci-Fi');
//         done();
//       });
//   });

//   // Test for DELETE route to delete a genre
//   it('should delete a genre', function(done) {
//     chai.request(app)
//       .delete('/genres/1') // Replace 1 with an actual genreId
//       .end(function(err, res) {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('message', 'Genre deleted');
//         done();
//       });
//   });
// });
