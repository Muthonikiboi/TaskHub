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
exports.deletTeamById = exports.getTeamById = exports.updateTeamById = exports.getAllTeams = exports.getTeamsByUserId = exports.createTeam = void 0;
const xata_1 = require("../xata");
const AppError_1 = __importDefault(require("../utils/AppError"));
const xata = (0, xata_1.getXataClient)();
const createTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamname, description, user_id } = req.body;
        // validate required fields 
        if (!teamname || !description || !user_id) {
            return next(new AppError_1.default("All fields must be field!", 400));
        }
        // Find the user by id
        const user = yield xata.db.Users.filter({ xata_id: user_id }).getFirst();
        if (!user) {
            return next(new AppError_1.default("User not found", 404));
        }
        // create team with user association
        const newTeam = yield xata.db.Teams.create({
            teamname,
            description,
            user_id
        });
        res.status(200).json({
            message: "Team created successfully",
            data: newTeam
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error creating team", 500));
    }
});
exports.createTeam = createTeam;
const getTeamsByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        // Find the user
        const user = yield xata.db.Users.filter({ xata_id: user_id }).getFirst();
        if (!user) {
            return next(new AppError_1.default("User not found", 404));
        }
        // Get all teams for this user
        const teams = yield xata.db.Teams.filter({ user_id }).getAll();
        res.status(200).json({
            message: "Teams fetched successfully",
            data: teams
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error fetching teams", 500));
    }
});
exports.getTeamsByUserId = getTeamsByUserId;
const getAllTeams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield xata.db.Teams.getAll();
        res.status(200).json({
            message: "Teams fetched successfully",
            data: teams
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error fetching teams", 500));
    }
});
exports.getAllTeams = getAllTeams;
const updateTeamById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamId = req.params.id;
        const updatedTeam = yield xata.db.Teams.update(teamId, req.body);
        res.status(200).json({
            message: "Team updated successfully",
            data: updatedTeam
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error updating team", 500));
    }
});
exports.updateTeamById = updateTeamById;
const getTeamById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamId = req.params.id;
        const team = yield xata.db.Teams.read(teamId);
        if (!team) {
            return next(new AppError_1.default("Team not found", 404));
        }
        ;
        // Get the associated user details
        const user = yield xata.db.Users.read(team.user_id);
        res.status(200).json({
            message: "Team fetched successfully",
            data: Object.assign(Object.assign({}, team), { user: user ? {
                    username: user.username,
                    useremail: user.useremail
                } : null })
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error updating team", 500));
    }
});
exports.getTeamById = getTeamById;
const deletTeamById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamId = req.params.id;
        const team = yield xata.db.Teams.read(teamId);
        if (!team) {
            return next(new AppError_1.default("Team not found", 404));
        }
        yield xata.db.Teams.delete(teamId);
        res.status(200).json({
            message: "Team deleted successfully"
        });
    }
    catch (err) {
        return next(new AppError_1.default("Error deleting team", 500));
    }
});
exports.deletTeamById = deletTeamById;
