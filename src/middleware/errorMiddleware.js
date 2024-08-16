import { ResponseError } from "../error/responsError.js";
import { CustomValidationError } from "../error/customValidationError.js";
import {CustomPrismaError} from "../error/customPrismaError.js";

export const errorMiddleware = async (err, req, res, next) => {
    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else if (err instanceof CustomValidationError) {
        res.status(400).json({
            errors: err.message
        }).end();
    } else if (err instanceof CustomPrismaError) {
        console.log('sd f');
        res.status(400).json({
            errors: err.message
        }).end();
    }
    else {
        res.status(500).json({
            errors: err.message
        });
    }
};