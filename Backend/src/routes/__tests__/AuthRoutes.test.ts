import request from 'supertest';
import app from '../../server'; // Adjust the path if necessary
import authRoutes from '../AuthRoutes'; // Adjust the path if necessary
import * as AuthController from '../../controllers/AuthControllers';
import { jest } from '@jest/globals';

jest.mock('../../controllers/AuthControllers', () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
  getAllUsers: jest.fn(),
  deleteUser: jest.fn()
}));

// Mock user data
const mockUser = {
  username: 'testuser',
  useremail: 'testuser@example.com',
  userpassword: 'testpassword', // Plain text password for testing
  xata_id: 'some_user_id'
};

const mockUsers = [
  mockUser,
  { 
    username: 'testuser2',
    useremail: 'testuser2@example.com',
    userpassword: 'testpassword2',
    xata_id: 'some_user_id2'
  }
];

describe('Auth Routes', () => {
  beforeAll(() => {
    app.use('/api/v1/users', authRoutes);
  });

  describe('POST /api/v1/users/register', () => {
    it('should register a new user', async () => {
      (AuthController.registerUser as jest.Mock).mockImplementation((req: any, res: any) => {
        expect(req.body.userpassword).toBe('testpassword');
        res.status(201).json({ message: 'User registered successfully', data: mockUser });
      });

      const response = await request(app)
        .post('/api/v1/users/register')
        .send({
          username: mockUser.username,
          useremail: mockUser.useremail,
          userpassword: 'testpassword'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.data).toEqual(mockUser);
    });

    // ... add more tests for registerUser if needed
  });

  describe('POST /api/v1/users/login', () => {
    it('should log in a user with valid credentials', async () => {
      (AuthController.loginUser as jest.Mock).mockImplementation((req: any, res: any) => {
        expect(req.body.userpassword).toBe('testpassword');
        res.status(200).json({
          message: "Logged in",
          user: {
            xata_id: mockUser.xata_id,
            username: mockUser.username,
            useremail: mockUser.useremail
          },
          token: 'mock_jwt_token'
        });
      });

      const response = await request(app)
        .post('/api/v1/users/login')
        .send({
          useremail: mockUser.useremail,
          userpassword: 'testpassword'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Logged in');
      expect(response.body.token).toBe('mock_jwt_token');
    });

    // ... add more tests for loginUser if needed
  });

  describe('GET /api/v1/users', () => {
    // it('should return a list of users (protected route)', async () => {
    //   (AuthController.getAllUsers as jest.Mock).mockImplementation((req: any, res: any) => {
    //     res.status(200).json({ message: 'Users fetched successfully', data: mockUsers });
    //   });

    //   const response = await request(app)
    //     .get('/api/v1/users')
    //     .set('Authorization', 'Bearer mock_jwt_token');

    //   expect(response.status).toBe(200);
    //   expect(response.body.message).toBe('Users fetched successfully');
    //   expect(response.body.data).toEqual(mockUsers);
    // });

    it('should return 401 for unauthorized access', async () => {
      const response = await request(app).get('/api/v1/users'); // No token provided

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('No token provided, authorization denied');
    });
  });

  // describe('DELETE /api/v1/users/:userId', () => {
  //   it('should delete a user (protected route)', async () => {
  //     const userId = mockUser.xata_id;
  //     (AuthController.deleteUser as jest.Mock).mockImplementation((req: any, res: any) => {
  //       res.status(200).json({ message: 'User deleted successfully' });
  //     });

  //     const response = await request(app)
  //       .delete(`/api/v1/users/${userId}`)
  //       .set('Authorization', 'Bearer mock_jwt_token');

  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe('User deleted successfully');
  //   });

  //   it('should return 401 for unauthorized access', async () => {
  //     const userId = mockUser.xata_id;
  //     const response = await request(app).delete(`/api/v1/users/${userId}`); // No token provided

  //     expect(response.status).toBe(401);
  //     expect(response.body.message).toBe('No token provided, authorization denied');
  //   });

  //   // Add tests for invalid user ID, error handling, etc.
  // });
});