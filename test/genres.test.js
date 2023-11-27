const db = require('../db');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Genres Routes', function() {
    let genreId;

    before(async function() {
        await db.query(`DELETE FROM genres WHERE name = 'Unique Test Genre'`);
        const genreCreationRes = await db.query(`INSERT INTO genres (name) VALUES ('Unique Test Genre') RETURNING id`);
        genreId = genreCreationRes.rows[0].id;
    });

    it('should add a new genre', function(done) {
        chai.request(app)
            .post('/genres')
            .send({ name: 'Another Unique Genre' }) // Use a unique name
            .end(function(err, res) {
                expect(res).to.have.status(201);
                done();
            });
    });

    it('should get all genres', function(done) {
      chai.request(app)
          .get('/genres')
          .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body.genres).to.be.an('array');
              done();
          });
    });

    it('should update a genre', function(done) {
        chai.request(app)
            .put(`/genres/${genreId}`)
            .send({ name: 'Sci-Fi' })
            .end(function(err, res) {
                done();
            });
    });

    it('should delete a genre', function(done) {
        chai.request(app)
            .delete(`/genres/${genreId}`)
            .end(function(err, res) {
                done();
            });
    });

    after(async function() {
        await db.query(`DELETE FROM genres WHERE id = $1`, [genreId]);
        await db.query(`DELETE FROM genres WHERE name = 'Another Unique Genre'`);
    });
});