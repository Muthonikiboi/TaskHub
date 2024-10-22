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
const UserRoutes_1 = __importDefault(require("../UserRoutes")); // Adjust the path if necessary
const UserController = __importStar(require("../../controllers/UserController"));
const globals_1 = require("@jest/globals");
globals_1.jest.mock('../../controllers/UserController', () => ({
    createUser: globals_1.jest.fn(),
    getAllUsers: globals_1.jest.fn(),
    getUserById: globals_1.jest.fn(),
    updateUserById: globals_1.jest.fn(),
    deleteUserById: globals_1.jest.fn(),
}));
const mockUsers = [
    {
        "role": "",
        "useremail": "john.doe@example.com",
        "username": "johnDoe",
        "userpassword": "$2b$10$krE6rTE47U.NzO7a3Fzh/OvNr3IXoImAjwagnbXJHJi9FeRNPVLPK",
        "xata_createdat": "2024-10-20T10:03:09.028Z",
        "xata_id": "rec_csadanerlsprh6rg4uu0",
        "xata_updatedat": "2024-10-20T12:03:23.312Z",
        "xata_version": 1
    }
];
describe('User Routes', () => {
    beforeAll(() => {
        server_1.default.use('/api/v1/users', UserRoutes_1.default); // Adjust the path if necessary
    });
    describe('GET /api/v1/users', () => {
        it('should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            UserController.getAllUsers.mockImplementation((req, res) => {
                res.status(200).json({ message: "Users fetched successfully", data: mockUsers });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/users');
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockUsers);
        }));
    });
    describe('POST /api/v1/users', () => {
        it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = {
                username: 'testuser',
                useremail: 'testuser@example.com',
                userpassword: 'testpassword',
                role: 'user'
            };
            UserController.createUser.mockImplementation((req, res) => {
                res.status(200).json({ message: "User created successfully", data: Object.assign(Object.assign({}, newUser), { xata_id: 'some_new_user_id' }) });
            });
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/api/v1/users')
                .send(newUser);
            expect(response.status).toBe(200);
            expect(response.body.data.username).toBe('testuser');
        }));
    });
    describe('GET /api/v1/users/:id', () => {
        it('should return a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = mockUsers[0].xata_id;
            UserController.getUserById.mockImplementation((req, res) => {
                res.status(200).json({ message: "User fetched successfully", data: mockUsers[0] });
            });
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/users/${userId}`);
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockUsers[0]);
        }));
    });
    describe('PATCH /api/v1/users/:id', () => {
        it('should update a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = mockUsers[0].xata_id;
            const updatedUser = { username: 'updatedusername' };
            UserController.updateUserById.mockImplementation((req, res) => {
                res.status(200).json({ message: "User updated successfully", data: Object.assign(Object.assign({}, mockUsers[0]), updatedUser) });
            });
            const response = yield (0, supertest_1.default)(server_1.default)
                .patch(`/api/v1/users/${userId}`)
                .send(updatedUser);
            expect(response.status).toBe(200);
            expect(response.body.data.username).toBe('updatedusername');
        }));
    });
    describe('DELETE /api/v1/users/:id', () => {
        it('should delete a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = mockUsers[0].xata_id;
            UserController.deleteUserById.mockImplementation((req, res) => {
                res.status(200).json({ message: "User deleted successfully" });
            });
            const response = yield (0, supertest_1.default)(server_1.default).delete(`/api/v1/users/${userId}`);
            expect(response.status).toBe(200);
        }));
    });
});
