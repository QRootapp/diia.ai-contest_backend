import { Request, Response } from 'express';

export class ReportController {
    public test(req: Request, res: Response) {
        res.status(200).send({ message: 'Hello world' });
    }
}
