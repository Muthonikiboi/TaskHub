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
const TeamRoutes_1 = __importDefault(require("../TeamRoutes")); // Adjust the path if necessary
const TeamController = __importStar(require("../../controllers/TeamController"));
const globals_1 = require("@jest/globals");
globals_1.jest.mock('../../controllers/TeamController', () => ({
    createTeam: globals_1.jest.fn(),
    getAllTeams: globals_1.jest.fn(),
    getTeamById: globals_1.jest.fn(),
    updateTeamById: globals_1.jest.fn(),
    deletTeamById: globals_1.jest.fn(), // Note the typo in your route file ('deletTeamById')
    getTeamsByUserId: globals_1.jest.fn()
}));
const mockTeams = [
    {
        "description": "Xoxo live experience 2024",
        "teamname": "Xoxo 24",
        "user_id": { "xata_id": "rec_cs9o8983dt2rbmedl51g" },
        "xata_createdat": "2024-10-19T13:24:44.880Z",
        "xata_id": "rec_cs9r675jen66ahq8unug",
        "xata_updatedat": "2024-10-19T13:37:30.995Z",
        "xata_version": 2
    },
    {
        "description": "Building intuitive interfaces",
        "teamname": "Frontend Team",
        "user_id": { "xata_id": "rec_cs9o305jen66ahq8umdg" },
        "xata_createdat": "2024-10-21T09:32:41.095Z",
        "xata_id": "rec_csb1vedjen66ahq8vajg",
        "xata_updatedat": "2024-10-21T09:32:41.095Z",
        "xata_version": 0
    }
];
describe('Team Routes', () => {
    beforeAll(() => {
        server_1.default.use('/api/v1/teams', TeamRoutes_1.default); // Adjust the path if necessary
    });
    describe('GET /api/v1/teams', () => {
        it('should return a list of teams', () => __awaiter(void 0, void 0, void 0, function* () {
            TeamController.getAllTeams.mockImplementation((req, res) => {
                res.status(200).json({ message: "Teams fetched successfully", data: mockTeams });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/teams');
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockTeams);
        }));
    });
    describe('POST /api/v1/teams', () => {
        it('should create a new team', () => __awaiter(void 0, void 0, void 0, function* () {
            const newTeam = {
                teamname: 'New Team',
                description: 'A new team for testing',
                user_id: { xata_id: 'some_user_id' }
            };
            TeamController.createTeam.mockImplementation((req, res) => {
                res.status(200).json({ message: "Team created successfully", data: Object.assign(Object.assign({}, newTeam), { xata_id: 'some_new_team_id' }) });
            });
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/api/v1/teams')
                .send(newTeam);
            expect(response.status).toBe(200);
            expect(response.body.data.teamname).toBe('New Team');
        }));
    });
    describe('GET /api/v1/teams/:id', () => {
        it('should return a team by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const teamId = mockTeams[0].xata_id;
            TeamController.getTeamById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Team fetched successfully", data: mockTeams[0] });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/teams/${teamId}`);
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockTeams[0]);
        }));
    });
    describe('PATCH /api/v1/teams/:id', () => {
        it('should update a team by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const teamId = mockTeams[0].xata_id;
            const updatedTeam = { description: 'Updated team description' };
            TeamController.updateTeamById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Team updated successfully", data: Object.assign(Object.assign({}, mockTeams[0]), updatedTeam) });
            });
            const response = yield (0, supertest_1.default)(server_1.default)
                .patch(`/api/v1/teams/${teamId}`)
                .send(updatedTeam);
            expect(response.status).toBe(200);
            expect(response.body.data.description).toBe('Updated team description');
        }));
    });
    describe('DELETE /api/v1/teams/:id', () => {
        it('should delete a team by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const teamId = mockTeams[0].xata_id;
            TeamController.deletTeamById.mockImplementation((req, res) => {
                res.status(200).json({ message: "Team deleted successfully" });
            });
            const response = yield (0, supertest_1.default)(server_1.default).delete(`/api/v1/teams/${teamId}`);
            expect(response.status).toBe(200);
        }));
    });
    describe('GET /api/v1/teams/user/:id', () => {
        it('should return teams by user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = mockTeams[0].user_id.xata_id;
            TeamController.getTeamsByUserId.mockImplementation((req, res) => {
                const teamsForUser = mockTeams.filter(team => team.user_id.xata_id === userId);
                res.status(200).json({ message: "Teams fetched successfully", data: teamsForUser });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/teams/user/${userId}`);
            expect(response.status).toBe(200);
            // Add assertions to check the correct teams are returned
        }));
    });
});
