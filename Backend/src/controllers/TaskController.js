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
exports.deleteTaskById = exports.getTaskById = exports.updateTaskById = exports.getAllTasks = exports.createTask = void 0;
const xata_1 = require("../xata");
const AppError_1 = __importDefault(require("../utils/AppError"));
const xata = (0, xata_1.getXataClient)();
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = yield xata.db.Tasks.create(req.body);
        res.status(200).json({
            message: "Task creaated successfully",
            data: newTask
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error creating task", 500));
    }
});
exports.createTask = createTask;
const getAllTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield xata.db.Tasks.getAll();
        res.status(200).json({
            message: "Tasks fetched successfully",
            data: tasks
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error fetching tasks", 500));
    }
});
exports.getAllTasks = getAllTasks;
const updateTaskById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield xata.db.Tasks.update(taskId, req.body);
        res.status(200).json({
            message: "Task updated successfully",
            data: task
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error updating task", 500));
    }
});
exports.updateTaskById = updateTaskById;
const getTaskById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield xata.db.Tasks.read(taskId);
        if (!task) {
            return next(new AppError_1.default("Task not found", 400));
        }
        ;
        res.status(200).json({
            message: "Task fetched successfully",
            data: task
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error fetching task", 500));
    }
});
exports.getTaskById = getTaskById;
const deleteTaskById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        yield xata.db.Tasks.delete(taskId);
        res.status(200).json({
            message: "Task deleted successfully"
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error deleting task", 500));
    }
});
exports.deleteTaskById = deleteTaskById;
