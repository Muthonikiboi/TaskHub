import express, { Express } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; // Adjusted path
import { getXataClient, XataClient } from './xata'; // Adjusted path
// import path from 'path';

dotenv.config();

// Debug line to check if the API key is loaded

console.log('XATA_API_KEY:', process.env.XATA_API_KEY);



export const xata = getXataClient();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
