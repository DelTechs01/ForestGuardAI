const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Alerts API', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create an alert', async () => {
    const res = await request(app)
      .post('/api/alerts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'fire',
        severity: 'high',
        location: 'Forest A',
        message: 'Fire detected in sector 1',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('type', 'fire');
  });

  it('should get alerts', async () => {
    const res = await request(app)
      .get('/api/alerts')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});