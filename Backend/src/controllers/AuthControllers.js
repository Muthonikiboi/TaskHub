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
exports.getAllUsers = exports.deleteUser = exports.loginUser = exports.registerUser = void 0;
const xata_1 = require("../xata");
const utils_1 = require("../utils/utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client = (0, xata_1.getXataClient)();
const sendResponse = (res, status, message, data) => {
    res.status(status).json({ message, data });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { useremail, userpassword, username } = req.body;
    try {
        const existingUser = yield client.db.Users.filter({ useremail }).getFirst();
        if (existingUser) {
            return sendResponse(res, 400, 'Email already in use');
        }
        const hashedPassword = yield bcrypt_1.default.hash(userpassword, 10);
        const newUser = yield client.db.Users.create({
            useremail,
            userpassword: hashedPassword,
            username
            // xata_id is not needed here, as it is auto-generated
        });
        console.log('User created:', newUser);
        sendResponse(res, 201, 'User registered successfully', newUser);
    }
    catch (error) {
        console.error('Error during user registration:', error);
        sendResponse(res, 500, 'Server error');
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { useremail, userpassword } = req.body;
    try {
        const user = yield client.db.Users.filter({ useremail }).getFirst();
        if (!user) {
            return sendResponse(res, 404, 'User not found');
        }
        // Compare hashed password
        const isPasswordValid = yield bcrypt_1.default.compare(userpassword, user.userpassword);
        if (isPasswordValid) {
            const token = (0, utils_1.generateToken)(user);
            if (token) {
                res.cookie('token', token, {
                    path: '/',
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 86400), // + 1 day
                    sameSite: false,
                    secure: false // Set to true in production
                });
                const { xata_id, username, useremail } = user; // xata_id is automatically available
                res.status(200).json({
                    message: "Logged in",
                    user: { xata_id, username, useremail },
                    token
                });
            }
            else {
                res.status(400).json({ message: "Invalid Token" });
            }
        }
        else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    }
    catch (error) {
        console.error(error);
        sendResponse(res, 500, 'Server error');
    }
});
exports.loginUser = loginUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const xata_id = req.params.xata_id; // No need to parse since it's a string
    try {
        const user = yield client.db.Users.filter({ xata_id }).getFirst();
        if (user) {
            yield client.db.Users.delete(user);
            sendResponse(res, 200, 'User deleted successfully');
        }
        else {
            sendResponse(res, 404, 'User not found');
        }
    }
    catch (error) {
        console.error('Error during user deletion:', error);
        sendResponse(res, 500, 'Server error');
    }
});
exports.deleteUser = deleteUser;
// Function to get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield client.db.Users.getAll(); // Fetch all users
        res.status(200).json(users); // Return the list of users
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllUsers = getAllUsers;
