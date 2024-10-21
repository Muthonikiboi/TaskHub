import { generateToken } from '../utils';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken'); 

describe('Token Utilities', () => {
  const mockUser = { useremail: 'test@example.com' };

  it('should generate a JWT token', () => {
    // Mock the return value of jwt.sign
    (jwt.sign as jest.Mock).mockReturnValue('mock_jwt_token');

    const token = generateToken(mockUser);

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUser.useremail },
      process.env.JWT_TOKEN, 
      { expiresIn: '1d' }
    );
    expect(token).toBe('mock_jwt_token');
  });

  it('should throw an error if JWT_TOKEN is not defined', () => {
   
    const originalJwtToken = process.env.JWT_TOKEN;
    delete process.env.JWT_TOKEN;

    expect(() => generateToken(mockUser)).toThrowError("JWT_TOKEN environment variable is not defined");

   
    process.env.JWT_TOKEN = originalJwtToken;
  });
});