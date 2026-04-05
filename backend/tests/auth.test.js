const request = require('supertest');
const app = require('../app'); // 
const User = require('../models/user'); // 

// 1. Mock the User model
jest.mock('../models/user');

describe('POST /login', () => {
  it('should return 200 and a user if credentials are valid', async () => {

    
    const mockUser = { id: 1, email: 'm@m.com' };
    const retorno = {// Define what the mocked database should return
      "message": "Logged in successfully",
      "success": true,
      "user": {
          "email": "m@m.com",
          "id": 1,
     },
    };
    User.findOne.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/')
      .send({
        email: 'm@m.com',
        password: '123'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(retorno);
    expect(User.findOne).toHaveBeenCalledWith('m@m.com', '123');
  });

  it('should return 401 if login fails', async () => {
    // Simulate user not found
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/')
      .send({ email: 'wrong@test.com', password: 'bad' });

    expect(response.statusCode).toBe(401);
  });
});