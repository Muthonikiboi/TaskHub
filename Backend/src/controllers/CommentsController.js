"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentById = exports.getCommentById = exports.updateCommentById = exports.getAllComments = exports.createComment = void 0;
const xata_1 = require("../xata");
const AppError_1 = __importDefault(require("../utils/AppError"));
const xata = (0, xata_1.getXataClient)();
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = yield xata.db.Comments.create(req.body);
        res.status(200).json({
            message: "Comment made successfully",
            data: newComment
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error creating comment", 500));
    }
});
exports.createComment = createComment;
const getAllComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield xata.db.Comments.getAll();
        res.status(200).json({
            message: "Comment fetched successfully",
            data: comments
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error fetching comments", 500));
    }
});
exports.getAllComments = getAllComments;
const updateCommentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.id;
        const comment = yield xata.db.Comments.update(commentId, req.body);
        res.status(200).json({
            message: "Comment updated successfully",
            data: comment
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error updating comment", 500));
    }
});
exports.updateCommentById = updateCommentById;
const getCommentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.id;
        const comment = yield xata.db.Comments.read(commentId);
        if (!comment) {
            return next(new AppError_1.default("Comment not found", 400));
        }
        ;
        res.status(200).json({
            message: "Comment fetched successfully",
            data: comment
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error fetching comment", 500));
    }
});
exports.getCommentById = getCommentById;
const deleteCommentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.id;
        yield xata.db.Comments.delete(commentId);
        res.status(200).json({
            message: "Comment deleted successfully"
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error deleting comment", 500));
    }
});
exports.deleteCommentById = deleteCommentById;
