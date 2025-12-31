const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test('Signup: should create a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', password: 'testpass', role: 'USER' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully.');
  });

  test('Login: should authenticate user and set cookies', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful.');
    expect(res.headers['set-cookie']).toBeDefined();
  });

  test('Logout: should clear cookies', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'testuser', password: 'testpass' });
    const res = await agent.post('/api/auth/logout');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Logged out successfully.');
  });
});
