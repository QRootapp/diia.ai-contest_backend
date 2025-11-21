import express, { Response } from 'express';
import dotenv from 'dotenv';
import { AppRouter } from './server.router';
import { errorHandler } from './middlewares/error-hendler.middleware';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST!;

app.use(express.json());

app.use('/api', AppRouter);

app.use(errorHandler);

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
