import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { ValidationError } from '../../../errors';

export const validateGetReportById = [
    param('id').exists().withMessage('ID is required').isInt({ min: 1 }).withMessage('id must be a positive integer'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ValidationError(errors.array().map((errors) => errors.msg)));
        }
        next();
    },
];
