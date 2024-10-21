import express, { Router } from "express";
import { body } from "express-validator";

import {
  createUser,
  getAllUsers,
  updateUserById,
  getUserById,
  deleteUserById,
} from "../controllers/UserController";

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(
    [body("username"), body("useremail"), body("userpassword")],
    createUser
  );

router
  .route("/:id")
  .get(getUserById)
  .patch(
    [body("username"), body("useremail"), body("userpassword")],
    updateUserById
  )
  .delete(deleteUserById);

export default router;
