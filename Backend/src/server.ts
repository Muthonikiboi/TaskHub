import express, { Express, Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';



dotenv.config();

const app: Express = express();
app.use(cookieParser());

import AppError from './utils/AppError';
import TaskRoutes from "./routes/TaskRoutes";
import TeamRoutes from "./routes/TeamRoutes";
import ProjectRoutes from "./routes/ProjectRoutes";
import CommentsRoutes from "./routes/CommentRoutes";
import userRoutes from './routes/userRoutes';
import dashBoardRoutes from './routes/dashBoardRoutes'
import adminRoutes from './routes/adminRoutes';




export default app;

const port: number = parseInt(process.env.PORT as string, 10) || 7000;
const host: string = 'localhost';

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(morgan('dev'));

// Routes
app.get("/", (req,res) => {
    res.status(200).json({
        message: "Welcome to the TasK Management Application"
    });
});

// passing the all routes to endpoint
app.use("/api/v1/tasks", TaskRoutes);
app.use("/api/v1/teams", TeamRoutes);
app.use("/api/v1/projects", ProjectRoutes);
app.use("/api/v1/comments", CommentsRoutes);
app.use('/api/v1/users', userRoutes);
// app.use("/api/v1/dashboard", dashBoardRoutes);
app.use("/api/v1/admin", adminRoutes);

// Handle undefined routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Cannot find ${req.method} ${req.url} on this server`, 404));
});

// Define custom error interface
interface AppErrorInstance extends ErrorRequestHandler {
    message: string,
    statusCode: number,
    status?: string
};

// Global error handler
app.use((err: AppErrorInstance, req: Request, res: Response, next: NextFunction) => {
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

