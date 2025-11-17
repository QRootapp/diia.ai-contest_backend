import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
