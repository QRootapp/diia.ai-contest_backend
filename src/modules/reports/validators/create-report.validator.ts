import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../../../errors';

export const validateCreateReport = [
    body('photoMeta.latitude').exists().withMessage('Latitude is required').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),

    body('photoMeta.longitude')
        .exists()
        .withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be between -180 and 180'),

    body('photoMeta.createdAt').exists().withMessage('CreatedAt is required').isISO8601().toDate().withMessage('CreatedAt must be a valid date'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ValidationError(errors.array()));
        }
        next();
    },
];
