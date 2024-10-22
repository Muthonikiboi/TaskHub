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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeam = exports.getAllTasks = exports.getAllUsers = void 0;
const xata_1 = require("../xata");
const client = (0, xata_1.getXataClient)();
// Admin function to view all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield client.db.Users.getAll(); // Fetch all users
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllUsers = getAllUsers;
// Admin function to view all tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield client.db.Tasks.getAll(); // Fetch all tasks
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllTasks = getAllTasks;
// Admin function to create a new team
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamname, description } = req.body;
    try {
        const newTeam = yield client.db.Teams.create({
            teamname,
            description
        });
        res.status(201).json({ message: 'Team created successfully', team: newTeam });
    }
    catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createTeam = createTeam;
