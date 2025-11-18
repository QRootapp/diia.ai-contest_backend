import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppRouter } from './server.router';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api', AppRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
