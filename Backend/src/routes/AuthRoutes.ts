import { Router } from 'express';
import { registerUser, loginUser, getAllUsers, deleteUserbyId } from '../controllers/AuthControllers';

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/").get( getAllUsers);
router.delete("/:userId",deleteUserbyId);

export default router;
