"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const TeamController_1 = require("../controllers/TeamController");
const router = express_1.default.Router();
router
    .route("/")
    .get(TeamController_1.getAllTeams)
    .post([(0, express_validator_1.body)("teamname"), (0, express_validator_1.body)("description"), (0, express_validator_1.body)("user_id")], TeamController_1.createTeam);
router
    .route("/:id")
    .get(TeamController_1.getTeamById)
    .patch([(0, express_validator_1.body)("teamname"), (0, express_validator_1.body)("description")], TeamController_1.updateTeamById)
    .delete(TeamController_1.deletTeamById);
router.route("/user/:id").get(TeamController_1.getTeamsByUserId);
exports.default = router;
