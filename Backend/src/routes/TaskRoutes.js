"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const TaskController_1 = require("../controllers/TaskController");
const router = express_1.default.Router();
router
    .route("/")
    .get(TaskController_1.getAllTasks)
    .post([(0, express_validator_1.body)("description"), (0, express_validator_1.body)("status"), (0, express_validator_1.body)("due_date")], TaskController_1.createTask);
router
    .route("/:id")
    .get(TaskController_1.getTaskById)
    .patch([(0, express_validator_1.body)("description"), (0, express_validator_1.body)("status"), (0, express_validator_1.body)("due_date")], TaskController_1.updateTaskById)
    .delete(TaskController_1.deleteTaskById);
exports.default = router;
