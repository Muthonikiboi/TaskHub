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
const TaskRoutes_1 = __importDefault(require("../TaskRoutes")); // Adjust the path if necessary
const TaskController = __importStar(require("../../controllers/TaskController"));
const globals_1 = require("@jest/globals");
globals_1.jest.mock('../../controllers/TaskController', () => ({
    createTask: globals_1.jest.fn(),
    getAllTasks: globals_1.jest.fn(),
    getTaskById: globals_1.jest.fn(),
    updateTaskById: globals_1.jest.fn(),
    deleteTaskById: globals_1.jest.fn(),
}));
// Mock task data - adjust to match your actual data structure
const mockTasks = [
    {
        "description": "Finish API documentation",
        "status": "in progress",
        "due_date": "2024-10-31",
        "xata_createdat": "2024-10-21T10:00:00.000Z",
        "xata_id": "some_task_id",
        "xata_updatedat": "2024-10-21T10:00:00.000Z",
        "xata_version": 0
    }
];
describe('Task Routes', () => {
    beforeAll(() => {
        server_1.default.use('/api/v1/tasks', TaskRoutes_1.default); // Adjust the path if necessary
    });
    describe('GET /api/v1/tasks', () => {
        it('should return a list of tasks', () => __awaiter(void 0, void 0, void 0, function* () {
            TaskController.getAllTasks.mockImplementation((req, res) => {
                res.status(200).json({ message: "Tasks fetched successfully", data: mockTasks });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/tasks');
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockTasks);
        }));
    });
    describe('POST /api/v1/tasks', () => {
        it('should create a new task', () => __awaiter(void 0, void 0, void 0, function* () {
            const newTask = {
                description: 'Write unit tests',
                status: 'todo',
                due_date: '2024-11-15'
            };
            TaskController.createTask.mockImplementation((req, res) => {
                res.status(200).json({ message: "Task created successfully", data: Object.assign(Object.assign({}, newTask), { xata_id: 'some_new_task_id' }) });
            });
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/api/v1/tasks')
                .send(newTask);
            expect(response.status).toBe(200);
            expect(response.body.data.description).toBe('Write unit tests');
        }));
    });
    describe('GET /api/v1/tasks/:id', () => {
        it('should return a task by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const taskId = mockTasks[0].xata_id;
            TaskController.getTaskById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Task fetched successfully", data: mockTasks[0] });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/tasks/${taskId}`);
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockTasks[0]);
        }));
    });
    describe('PATCH /api/v1/tasks/:id', () => {
        it('should update a task by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const taskId = mockTasks[0].xata_id;
            const updatedTask = { status: 'completed' };
            TaskController.updateTaskById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Task updated successfully", data: Object.assign(Object.assign({}, mockTasks[0]), updatedTask) });
            });
            const response = yield (0, supertest_1.default)(server_1.default)
                .patch(`/api/v1/tasks/${taskId}`)
                .send(updatedTask);
            expect(response.status).toBe(200);
            expect(response.body.data.status).toBe('completed');
        }));
    });
    describe('DELETE /api/v1/tasks/:id', () => {
        it('should delete a task by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const taskId = mockTasks[0].xata_id;
            TaskController.deleteTaskById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Task deleted successfully" });
            });
            const response = yield (0, supertest_1.default)(server_1.default).delete(`/api/v1/tasks/${taskId}`);
            expect(response.status).toBe(200);
        }));
    });
});
