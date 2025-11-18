import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './database';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    const result = await db.raw('SELECT 1 + 1 AS result');
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
