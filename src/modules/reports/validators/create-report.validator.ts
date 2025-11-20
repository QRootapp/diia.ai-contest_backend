import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../../../errors';

export const validateCreateReport = [
    body('latitude').exists().withMessage('Latitude is required').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),

    body('longitude').exists().withMessage('Longitude is required').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),

    body('createdAt').exists().withMessage('CreatedAt is required').isISO8601().toDate().withMessage('CreatedAt must be a valid date'),

    body('vehicleLicensePlate').exists().withMessage('VehicleLicensePlate is required').isString().withMessage('VehicleLicensePlate must be a string'),

    body('firstName').exists().withMessage('FirstName is required').isString().withMessage('FirstName must be a string'),

    body('lastName').exists().withMessage('LastName is required').isString().withMessage('LastName must be a string'),

    body('middleName').exists().withMessage('MiddleName is required').isString().withMessage('MiddleName must be a string'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ValidationError(errors.array().map((errors) => errors.msg)));
        }
        next();
    },
];
