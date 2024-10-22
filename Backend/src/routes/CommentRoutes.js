"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const CommentsController_1 = require("../controllers/CommentsController");
const router = express_1.default.Router();
console.log(CommentsController_1.createComment);
router
    .route("/")
    .get(CommentsController_1.getAllComments)
    .post([(0, express_validator_1.body)("content")], CommentsController_1.createComment);
router
    .route("/:id")
    .get(CommentsController_1.getCommentById)
    .patch([(0, express_validator_1.body)("content")], CommentsController_1.updateCommentById)
    .delete(CommentsController_1.deleteCommentById);
exports.default = router;
