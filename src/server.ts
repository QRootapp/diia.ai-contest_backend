import express, { Response } from 'express';
import dotenv from 'dotenv';
import { AppRouter } from './server.router';
import { errorHandler } from './middlewares/error-hendler.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api', AppRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
