"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const AppError_1 = __importDefault(require("./utils/AppError"));
const TaskRoutes_1 = __importDefault(require("./routes/TaskRoutes"));
const TeamRoutes_1 = __importDefault(require("./routes/TeamRoutes"));
const ProjectRoutes_1 = __importDefault(require("./routes/ProjectRoutes"));
const CommentRoutes_1 = __importDefault(require("./routes/CommentRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const app = (0, express_1.default)();
exports.default = app;
const port = parseInt(process.env.PORT, 10) || 7000;
const host = 'localhost';
// for parsing application/json
app.use(express_1.default.json());
// for parsing application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the TasK Management Application"
    });
});
// passing the all routes to endpoint
app.use("/api/v1/tasks", TaskRoutes_1.default);
app.use("/api/v1/teams", TeamRoutes_1.default);
app.use("/api/v1/projects", ProjectRoutes_1.default);
app.use("/api/v1/comments", CommentRoutes_1.default);
app.use('/api/v1/users', AuthRoutes_1.default);
// Handle undefined routes
app.all("*", (req, res, next) => {
    next(new AppError_1.default(`Cannot find ${req.method} ${req.url} on this server`, 404));
});
;
// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'Error';
    res.status(statusCode).json({
        status,
        message: err.message || "Internal Server Error"
    });
});
app.listen(port, host, () => {
    console.log(`✅Server running at http://${host}:${port}🚀🌟`);
});
