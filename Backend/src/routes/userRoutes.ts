import { Router } from 'express';
import { registerUser, loginUser, getAllUsers, deleteUser } from '../controllers/userControllers';
import { protect, adminOnly } from '../middlewares/authMiddlewares';

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:userId", protect, adminOnly, deleteUser);

export default router;
