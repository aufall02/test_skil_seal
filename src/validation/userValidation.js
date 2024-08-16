
import Joi from "joi";

// id       String @id @default(auto()) @map("_id") @db.ObjectId
// name     String
// email    String @unique
// password String
// avatar   String

export const registerUsersValidation = Joi.object({
    email: Joi.string().max(100).email().required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    avatar: Joi.string().max(100).optional()
});


export const loginUserValidation = Joi.object({
    email: Joi.string().max(100).email().required(),
    password: Joi.string().max(100).required()
})

export const getUserValidation = Joi.string().max(100).required()

export const updateUserValidation = Joi.object({
    id: Joi.string().max(100).optional(),
    email: Joi.string().max(100).optional(),
    password: Joi.string().max(100).optional(),
    name: Joi.string().max(100).optional(),
    avatar: Joi.string().max(100).optional()
})