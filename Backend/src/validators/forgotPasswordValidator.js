"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidator = exports.forgotPasswordValidator = void 0;
const express_validator_1 = require("express-validator");
const validators_1 = require("./validators");
exports.forgotPasswordValidator = (0, validators_1.validateRequest)([
    (0, express_validator_1.body)('email').isEmail().withMessage('Please provide a valid email'),
]);
exports.resetPasswordValidator = (0, validators_1.validateRequest)([
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]);
