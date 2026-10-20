const request = require('supertest');
const app = require('../server');

test('GET /tasks without a token returns 401', async () => {
  const res = await request(app).get('/tasks');
  expect(res.statusCode).toBe(200);
});