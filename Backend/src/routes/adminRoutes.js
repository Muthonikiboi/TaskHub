"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = (0, express_1.Router)();
// Admin routes
router.get("/users", authMiddlewares_1.protect, authMiddlewares_1.adminOnly, adminController_1.getAllUsers); // View all users
router.get("/tasks", authMiddlewares_1.protect, authMiddlewares_1.adminOnly, adminController_1.getAllTasks); // View all tasks
router.post("/team", authMiddlewares_1.protect, authMiddlewares_1.adminOnly, adminController_1.createTeam); // Create a team
exports.default = router;
