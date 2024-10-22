import { generateToken } from '../utils'; // Adjust the path if needed
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken'); // Mock jsonwebtoken for token generation

describe('Token Utilities', () => {
  const mockUser = { useremail: 'test@example.com' };

  it('should generate a JWT token', () => {
    // Mock the return value of jwt.sign
    (jwt.sign as jest.Mock).mockReturnValue('mock_jwt_token');

    const token = generateToken(mockUser);

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUser.useremail },
      process.env.JWT_TOKEN, // Or your actual secret if not using env variables
      { expiresIn: '1d' }
    );
    expect(token).toBe('mock_jwt_token');
  });

  it('should throw an error if JWT_TOKEN is not defined', () => {
    // Temporarily delete the JWT_TOKEN environment variable (if you're using one)
    const originalJwtToken = process.env.JWT_TOKEN;
    delete process.env.JWT_TOKEN;

    expect(() => generateToken(mockUser)).toThrowError("JWT_TOKEN environment variable is not defined");

    // Restore the JWT_TOKEN environment variable
    process.env.JWT_TOKEN = originalJwtToken;
  });
});