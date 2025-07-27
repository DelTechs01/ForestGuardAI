const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Sensor Data API', () => {
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

  it('should create sensor data', async () => {
    const res = await request(app)
      .post('/api/sensor-data')
      .set('Authorization', `Bearer ${token}`)
      .send({
        temperature: 25,
        humidity: 60,
        co2: 400,
        location: 'Forest A',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('temperature', 25);
  });

  it('should get sensor data', async () => {
    const res = await request(app)
      .get('/api/sensor-data')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});