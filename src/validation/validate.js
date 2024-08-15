import { CustomValidationError } from "../error/customValidationError.js";
import pkg from "joi";
const { ValidationError } = pkg;

export const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    });

    if (result.error) {
        throw new CustomValidationError(result.error)
    } else {
        return result.value;
    }
};