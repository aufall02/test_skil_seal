import Joi from "joi";

export const createProjectValidation = Joi.object({
    name: Joi.string().max(100).required()
});

export const getProjectValidation = Joi.string().required();

export const updateProjectValidation = Joi.object({
    name: Joi.string().max(100).required()
});

export const searchTaskValidation = Joi.object({
    name: Joi.string().max(100).required()
})