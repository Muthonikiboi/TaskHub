"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeamValidator = void 0;
const express_validator_1 = require("express-validator");
const validators_1 = require("./validators"); // Assuming this is your shared validation function
exports.createTeamValidator = (0, validators_1.validateRequest)([
    (0, express_validator_1.body)('teamName').notEmpty().withMessage('Team name is required'),
    (0, express_validator_1.body)('members').isArray().withMessage('Members should be an array of user IDs')
]);
