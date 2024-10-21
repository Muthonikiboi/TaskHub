import express, { Router } from "express";
import { body } from "express-validator";

import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  getTeamsByUserId
} from "../controllers/TeamController";

const router = express.Router();

router
  .route("/")
  .get(getAllTeams)
  .post([body("teamname"), body("description"),body("user_id")], createTeam);

router
  .route("/:id")
  .get(getTeamById)
  .patch([body("teamname"), body("description")], updateTeamById)
  .delete(deleteTeamById);

router.route("/user/:id").get(getTeamsByUserId)  

  export default router;