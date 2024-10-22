"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (user) => {
    const jwtSecret = process.env.JWT_TOKEN;
    if (!jwtSecret) {
        throw new Error("JWT_TOKEN environment variable is not defined");
    }
    const payload = {
        id: user.useremail,
    };
    return (0, jsonwebtoken_1.sign)(payload, jwtSecret, { expiresIn: '1d' });
};
exports.generateToken = generateToken;
