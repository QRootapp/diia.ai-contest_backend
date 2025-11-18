import { Request, Response, NextFunction } from 'express';
import { ValidationError, AppError } from '../errors';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    if (err instanceof ValidationError) {
        console.log(
            'err.errors.map(({ msg }) => msg) :>> ',
            err.errors.map(({ msg }) => msg)
        );
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors.map(({ msg }) => msg),
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
}
