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
exports.resetPassword = exports.forgotPassword = void 0;
const xata_1 = require("../xata");
const crypto_1 = __importDefault(require("crypto"));
const emails_1 = require("../utils/emails");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = (0, xata_1.getXataClient)();
// Request Password Reset
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield client.db.Users.filter({ useremail: email }).getFirst();
        if (!user) {
            res.status(404).json({ message: 'User with that email not found' });
            return;
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
        // Save token and expiry to user record
        yield client.db.Users.update(user.xata_id, {
            resetToken,
            resetTokenExpiry
        });
        const resetUrl = `${req.protocol}://${req.get('host')}/api/users/reset-password/${resetToken}`;
        // Send email
        yield (0, emails_1.sendEmail)({
            email: user.useremail,
            subject: 'Password Reset',
            message: `You are receiving this because you requested a password reset. Click on this link to reset your password: ${resetUrl}`
        });
        res.status(200).json({ message: 'Reset link sent to your email' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.forgotPassword = forgotPassword;
// Reset Password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resetToken } = req.params;
    const { password } = req.body;
    try {
        const user = yield client.db.Users.filter({ resetToken }).getFirst();
        if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
            res.status(400).json({ message: 'Token is invalid or has expired' });
            return;
        }
        // Hash new password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Update password and clear reset token
        yield client.db.Users.update(user.xata_id, {
            userpassword: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null
        });
        res.status(200).json({ message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.resetPassword = resetPassword;
