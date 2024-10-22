import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getXataClient } from '../xata';
import dotenv from 'dotenv';
// import { CustomRequest } from '../custom.d.ts';

dotenv.config();

const client = getXataClient();

// Define a custom request type
interface CustomRequest extends Request {
    user?: any; // Replace 'any' with a specific user type if available
}

// Middleware to protect routes
const protect = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token provided, authorization denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN || 'your_secret');
        req.user = decoded; // Attach user info to request

        // Fetch user details from the database
        const useremail = req.user.useremail;
        const existingUser = await client.db.Users.filter({ useremail }).getFirst();

        if (existingUser) {
            // Attach user details, including role
            req.user = existingUser; // Assuming existingUser has the role property
            next();
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Middleware for admin-only routes
const adminOnly = (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== 'admin') {
     res.status(403).json({ message: 'Access denied: Admins only' });
     return;
    }
    next(); // Allow access to the next middleware or route handler
};



// Middleware for regular users
const regularUserOnly = (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role === 'admin') {
        res.status(403).json({ message: 'Access denied: Regular users only' });
        return;
    }
    next(); // Allow access to the next middleware or route handler
};

export { protect, adminOnly , regularUserOnly };
