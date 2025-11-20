import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../../../errors';

export const validateUpdateReport = [
    body('latitude').exists().withMessage('Latitude is required').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),

    body('longitude').exists().withMessage('Longitude is required').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),

    body('createdAt').exists().withMessage('CreatedAt is required').isISO8601().toDate().withMessage('CreatedAt must be a valid date'),

    body('durationMinutes').exists().withMessage('DurationMinutes is required').isInt().withMessage('DurationMinutes must be number'),

    body('confidence').exists().withMessage('Confidence is required').isFloat().withMessage('Confidence must be a float'),

    body('vehicleLicensePlate').exists().withMessage('VehicleLicensePlate is required').isString().withMessage('VehicleLicensePlate must be a string'),

    param('id').exists().withMessage('ID is required').isInt({ min: 1 }).withMessage('id must be a positive integer'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ValidationError(errors.array().map((errors) => errors.msg)));
        }
        next();
    },
];
