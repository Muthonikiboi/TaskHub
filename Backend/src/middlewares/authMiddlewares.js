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
exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const xata_1 = require("../xata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = (0, xata_1.getXataClient)();
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.cookies.token || ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
    console.log('secret :', process.env.JWT_TOKEN);
    console.log('token from cookie:', token);
    if (!token) {
        res.status(401).json({ message: 'No token provided, authorization denied' });
        return; // Ensures the function exits here
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN || 'your_secret');
        req.user = decoded; // Attach user info to request
        const useremail = req.user.useremail; // Use useremail instead of email
        const existingUser = yield client.db.Users.filter({ useremail }).getFirst();
        console.log("", existingUser);
        if (existingUser !== null) {
            // Do any checks required here
        }
        next(); // Continue to the next middleware or route handler
    }
    catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
});
exports.protect = protect;
const adminOnly = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.cookies.token || ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
    if (!token) {
        res.status(401).json({ message: 'No token provided, authorization denied' });
        return; // Ensures the function exits here
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN || 'your_secret');
        req.user = decoded; // Attach user info to request
        const useremail = req.user.useremail; // Use useremail instead of email
        const existingUser = yield client.db.Users.filter({ useremail }).getFirst();
        if (existingUser !== null) {
            console.log(existingUser); // Logging the existing user
            // Adjust logic if necessary
            next(); // Allow access if admin check is not applicable
        }
        else {
            res.status(401).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
});
exports.adminOnly = adminOnly;
