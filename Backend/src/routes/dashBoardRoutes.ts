// routes.ts (or wherever you define your routes)
import express from 'express';
import { protect, adminOnly, regularUserOnly } from '../middlewares/authMiddlewares';
import { CustomRequest } from '../custom';

const router = express.Router();



// Admin Dashboard Route
router.get('/dashboard/admin', protect, adminOnly, (req:CustomRequest, res) => {
    // Render the admin dashboard
    res.status(200).json({
        message: 'Welcome to the admin dashboard',
        user: req.user, // Include user information if needed
    });
});

// Regular User Dashboard Route
router.get('/dashboard/user', protect, regularUserOnly, (req: CustomRequest, res) => {
    // Render the regular user dashboard
    res.status(200).json({
        message: 'Welcome to your dashboard',
        user: req.user, // Include user information if needed
    });
});

export default router;
