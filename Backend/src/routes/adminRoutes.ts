// import { Router } from 'express';
// import { getAllUsers, getAllTasks, createTeam } from '../controllers/adminController';
// import { protect, adminOnly } from '../middlewares/authMiddlewares';

// const router = Router();

// // Admin routes
// router.get("/users", protect, adminOnly, getAllUsers); // View all users
// router.get("/tasks", protect, adminOnly, getAllTasks); // View all tasks
// router.post("/team", protect, adminOnly, createTeam); // Create a team
// router.get('/admin/dashboard', protect, adminOnly, (req, res) => {
//     res.status(200).json({ message: 'Welcome to the admin dashboard!' });
// });

// export default router;


import { Router } from 'express';
import { protect, adminOnly } from '../middlewares/authMiddlewares'; // Assuming you have an auth middleware
import { 
    getAllUsers, 
    getAllTasks, 
    createTeam, 
    searchUsers, 
    getAllComments, 
    deleteUser 
} from '../controllers/adminController'; // Adjust the path as necessary

const router = Router();

router.use(protect); //protect all routes

// Route to view all users
router.get("/users",adminOnly, getAllUsers);

// Route to view all tasks
router.get("/tasks",adminOnly, getAllTasks);

// Route to create a new team
router.post("/teams",adminOnly, createTeam);

// Route to search users by email or username
router.get("/users/search", adminOnly, searchUsers);

// Route to view all comments
router.get("/comments",adminOnly, getAllComments);

// Route to delete a user by ID
router.delete("/users/:userId", adminOnly, deleteUser);

export default router;

