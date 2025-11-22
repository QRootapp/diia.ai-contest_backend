import express, { Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AppRouter } from './server.router';
import { errorHandler } from './middlewares/error-hendler.middleware';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST!;

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

app.use(express.json());

app.use('/api', AppRouter);

app.use(errorHandler);

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
