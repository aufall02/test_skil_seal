import Joi from "joi";

export const createTaskValidation = Joi.object({
    title: Joi.string().max(100).required(),
    completed: Joi.boolean().default(true).required(),
    projectId: Joi.string().max(100).required(),
});

export const getTaskValidation = Joi.string().required();

export const updateTaskValidation = Joi.object({
    title: Joi.string().max(100).required(),
    completed: Joi.boolean().required(),
    projectId: Joi.string().max(100).required(),
});

export const searchTaskValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    title: Joi.string().max(100).optional(),
    completed: Joi.boolean().optional(),
    projectId: Joi.string().max(100).required(),
})