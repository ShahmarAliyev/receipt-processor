const request = require('supertest');
let { receipt1, receipt2, receipt3 } = require('../models/receipt');
const { generateID, addPoints } = require('../controllers/helpers');
const { app, server } = require('../index.js');
afterAll((done) => {
  server.close(done);
});

describe('Express App', () => {
  it('should respond with "Hello World" at the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toBe('Hello World');
  });
});
describe('Route Integration', () => {
  describe('Post request to /receipts/process', () => {
    it('responds with 200 status and application type json', async () => {
      return await request(app)
        .post('/receipts/process')
        .send(receipt1)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    it('responds with correct hashed id  with id field inside an object', async () => {
      let hashedId = generateID(receipt2);
      return await request(app)
        .post('/receipts/process')
        .send(receipt2)
        .expect((res) => {
          expect(res.body.id).toEqual(hashedId);
        });
    });
  });
  describe('Get request to /receipts/:id/points', () => {
    let id;
    let actualPoints;

    beforeAll(async () => {
      const res = await request(app).post('/receipts/process').send(receipt3);
      id = res.body.id;
      actualPoints = addPoints(receipt3);
    });

    it('finds the ticket from the receipts storage and correctly calculates the points', async () => {
      return await request(app)
        .get('/receipts/' + id + '/points/')
        .expect((res) => {
          expect(res.body.points).toEqual(actualPoints);
        });
    });
  });
});
