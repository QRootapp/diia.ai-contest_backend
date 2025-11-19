import { AppError } from './app.error';

export class ValidationError extends AppError {
    public readonly errors: any[];

    constructor(errors: string[]) {
        super('Validation failed', 400);
        this.errors = errors;
    }
}
