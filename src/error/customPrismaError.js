import { Prisma } from '@prisma/client';

export class CustomPrismaError extends Error {
    constructor(error) {
        super();

        // Set default message if none is provided by the Prisma error
        this.message = error.message || 'An error occurred';
        this.details = [];

        // Customize the error handling based on Prisma error code
        switch (error.code) {
            case 'P2002':
                this.message = `Unique constraint failed on the ${error.meta.target.join(', ')}`;
                break;
            case 'P2025':
                this.message = 'Record not found';
                break;
            case 'P2003':
                this.message = `Foreign key constraint failed on the field: ${error.meta.field_name}`;
                break;
            case 'P2000':
                this.message = `The provided value for the field is too long for the column.`;
                break;
            case 'P2011':
                this.message = `Null constraint violation on the ${error.meta.target}`;
                break;
            case 'P2017':
                this.message = `The record does not exist in the database.`;
                break;
            case 'P2026':
                this.message = `The current database connection is lost.`;
                break;
            case 'P2023':
                this.message = `id not valid`;
                break;
            default:
                this.message = 'An unknown error occurred';
                break;
        }

        // Include original Prisma error details
        this.details = error.meta || {};
        this.stack = error.stack || new Error().stack;
    }
}
