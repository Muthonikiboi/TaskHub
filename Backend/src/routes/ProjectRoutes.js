"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const ProjectControllers_1 = require("../controllers/ProjectControllers");
const router = express_1.default.Router();
router
    .route("/")
    .get(ProjectControllers_1.getAllProjects)
    .post([(0, express_validator_1.body)("projectname")], ProjectControllers_1.createProject);
router
    .route("/:id")
    .get(ProjectControllers_1.getProjectById)
    .patch([(0, express_validator_1.body)("projectname")], ProjectControllers_1.updateProjectById)
    .delete(ProjectControllers_1.deleteProjectById);
exports.default = router;
