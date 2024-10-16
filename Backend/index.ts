import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();

const port: number = parseInt(process.env.PORT as string, 10) || 7000;
const host: string = 'localhost';

app.use(express.json());

app.use(cors());

app.listen(port, host, () => {
    console.log(`🚀 Server running at http://${host}:${port}`);
});