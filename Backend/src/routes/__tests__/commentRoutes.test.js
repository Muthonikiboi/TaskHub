"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server")); // Adjust the path if necessary
const CommentRoutes_1 = __importDefault(require("../CommentRoutes")); // Adjust the path if necessary
const CommentsController = __importStar(require("../../controllers/CommentsController"));
const globals_1 = require("@jest/globals");
globals_1.jest.mock('../../controllers/CommentsController', () => ({
    getAllComments: globals_1.jest.fn(),
    createComment: globals_1.jest.fn(),
    getCommentById: globals_1.jest.fn(),
    updateCommentById: globals_1.jest.fn(),
    deleteCommentById: globals_1.jest.fn(),
}));
const mockComments = [
    {
        "content": "The admin endpoints are working kudos!!",
        "task_id": { "xata_id": "rec_csavo6g3dt2rbmeduma0" },
        "user_id": { "xata_id": "rec_cs9o8iurlsprh6rg4nn0" },
        "xata_createdat": "2024-10-21T08:46:04.233Z",
        "xata_id": "rec_csb19j6rlsprh6rhesqg",
        "xata_updatedat": "2024-10-21T08:46:04.233Z",
        "xata_version": 0
    }
];
describe('Comment Routes', () => {
    beforeAll(() => {
        server_1.default.use('/api/v1/comments', CommentRoutes_1.default);
    });
    describe('GET /api/v1/comments', () => {
        it('should return a list of comments', () => __awaiter(void 0, void 0, void 0, function* () {
            CommentsController.getAllComments.mockImplementation((req, res) => {
                res.status(200).json({ message: "Comment fetched successfully", data: mockComments });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/comments');
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockComments);
        }));
    });
    describe('POST /api/v1/comments', () => {
        it('should create a new comment', () => __awaiter(void 0, void 0, void 0, function* () {
            const newComment = { content: 'New comment' };
            CommentsController.createComment.mockImplementation((req, res) => {
                res.status(200).json({ message: "Comment made successfully", data: Object.assign(Object.assign({}, newComment), { xata_id: 'some_xata_id' }) });
            });
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/api/v1/comments')
                .send(newComment);
            expect(response.status).toBe(200);
            expect(response.body.data.content).toBe('New comment');
        }));
    });
    describe('GET /api/v1/comments/:id', () => {
        it('should return a comment by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const commentId = mockComments[0].xata_id;
            CommentsController.getCommentById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Comment fetched successfully", data: mockComments[0] });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/comments/${commentId}`);
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockComments[0]);
        }));
    });
    describe('PATCH /api/v1/comments/:id', () => {
        it('should update a comment by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const commentId = mockComments[0].xata_id;
            const updatedComment = { content: 'Updated comment' };
            CommentsController.updateCommentById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Comment updated successfully", data: Object.assign(Object.assign({}, mockComments[0]), { content: updatedComment.content }) });
            });
            const response = yield (0, supertest_1.default)(server_1.default)
                .patch(`/api/v1/comments/${commentId}`)
                .send(updatedComment);
            expect(response.status).toBe(200);
            expect(response.body.data.content).toBe('Updated comment');
        }));
    });
    describe('DELETE /api/v1/comments/:id', () => {
        it('should delete a comment by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const commentId = mockComments[0].xata_id;
            CommentsController.deleteCommentById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Comment deleted successfully" });
            });
            const response = yield (0, supertest_1.default)(server_1.default).delete(`/api/v1/comments/${commentId}`);
            expect(response.status).toBe(200);
        }));
    });
});
