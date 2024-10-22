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
const ProjectRoutes_1 = __importDefault(require("../ProjectRoutes")); // Adjust the path if necessary
const ProjectControllers = __importStar(require("../../controllers/ProjectControllers"));
const globals_1 = require("@jest/globals");
globals_1.jest.mock('../../controllers/ProjectControllers', () => ({
    createProject: globals_1.jest.fn(),
    getAllProjects: globals_1.jest.fn(),
    getProjectById: globals_1.jest.fn(),
    updateProjectById: globals_1.jest.fn(),
    deleteProjectById: globals_1.jest.fn(),
}));
const mockProjects = [
    {
        "projectname": "Task Managemant API",
        "team_id": { "xata_id": "rec_cs9r675jen66ahq8unug" },
        "xata_createdat": "2024-10-21T05:15:39.146Z",
        "xata_id": "rec_csau6uo3dt2rbmedl9k0",
        "xata_updatedat": "2024-10-21T05:15:39.146Z",
        "xata_version": 0
    }
];
describe('Project Routes', () => {
    beforeAll(() => {
        server_1.default.use('/api/v1/projects', ProjectRoutes_1.default); // Make sure this matches your actual API endpoint
    });
    describe('GET /api/v1/projects', () => {
        it('should return a list of projects', () => __awaiter(void 0, void 0, void 0, function* () {
            ProjectControllers.getAllProjects.mockImplementation((req, res) => {
                res.status(200).json({ message: "Projects fetched successfully", data: mockProjects });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/projects');
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockProjects);
        }));
    });
    describe('POST /api/v1/projects', () => {
        it('should create a new project', () => __awaiter(void 0, void 0, void 0, function* () {
            const newProject = { projectname: 'New Project', team_id: { xata_id: 'some_team_id' } };
            ProjectControllers.createProject.mockImplementation((req, res) => {
                res.status(200).json({ message: "Project created successfully", data: Object.assign(Object.assign({}, newProject), { xata_id: 'some_xata_id' }) });
            });
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/api/v1/projects')
                .send(newProject);
            expect(response.status).toBe(200);
            expect(response.body.data.projectname).toBe('New Project');
        }));
    });
    describe('GET /api/v1/projects/:id', () => {
        it('should return a project by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const projectId = mockProjects[0].xata_id;
            ProjectControllers.getProjectById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Project fetched successfully", data: mockProjects[0] });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/projects/${projectId}`);
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockProjects[0]);
        }));
    });
    describe('PATCH /api/v1/projects/:id', () => {
        it('should update a project by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const projectId = mockProjects[0].xata_id;
            const updatedProject = { projectname: 'Updated Project Name' };
            ProjectControllers.updateProjectById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Project updated successfully", data: Object.assign(Object.assign({}, mockProjects[0]), { projectname: updatedProject.projectname }) });
            });
            const response = yield (0, supertest_1.default)(server_1.default)
                .patch(`/api/v1/projects/${projectId}`)
                .send(updatedProject);
            expect(response.status).toBe(200);
            expect(response.body.data.projectname).toBe('Updated Project Name');
        }));
    });
    describe('DELETE /api/v1/projects/:id', () => {
        it('should delete a project by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const projectId = mockProjects[0].xata_id;
            ProjectControllers.deleteProjectById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Project deleted successfully" });
            });
            const response = yield (0, supertest_1.default)(server_1.default).delete(`/api/v1/projects/${projectId}`);
            expect(response.status).toBe(200);
        }));
    });
});
