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
exports.deleteProjectById = exports.getProjectById = exports.updateProjectById = exports.getAllProjects = exports.createProject = void 0;
const xata_1 = require("../xata");
const AppError_1 = __importDefault(require("../utils/AppError"));
const xata = (0, xata_1.getXataClient)();
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProject = yield xata.db.Projects.create(req.body);
        res.status(200).json({
            message: "Project created successfully",
            data: newProject
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error creating project", 500));
    }
});
exports.createProject = createProject;
const getAllProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield xata.db.Projects.getAll();
        res.status(200).json({
            message: "Projects fetched successfully",
            data: projects
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error fetching project", 500));
    }
});
exports.getAllProjects = getAllProjects;
const updateProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        const project = yield xata.db.Projects.update(projectId, req.body);
        res.status(200).json({
            message: "Project updated successfully",
            data: project
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error updating project", 500));
    }
});
exports.updateProjectById = updateProjectById;
const getProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        const project = yield xata.db.Projects.read(projectId);
        if (!project) {
            return next(new AppError_1.default("Task not found", 400));
        }
        ;
        res.status(200).json({
            message: "Project fetched successfully",
            data: project
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error fetching project", 500));
    }
});
exports.getProjectById = getProjectById;
const deleteProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        yield xata.db.Projects.delete(projectId);
        res.status(200).json({
            message: "Project deleted successfully"
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error deleting project", 500));
    }
});
exports.deleteProjectById = deleteProjectById;
