import {prismaClient} from "../config/database.js";
import {ResponseError} from "../error/responsError.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUsersValidation,
    updateUserValidation
} from "../validation/userValidation.js";
import {validate} from "../validation/validate.js";
import bcrypt from 'bcryptjs';
import {createToken} from "../utils/jwt.js";

const register = async (request) => {
    const user = validate(registerUsersValidation, request);
    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    user.password = await bcrypt.hash(user.password, 10);

    if (countUser === 1) {
        throw new ResponseError(400, 'username already exists');
    }

    return prismaClient.user.create({
        data: user,
        select: {
            email: true,
            avatar: true,
            name:true
        }
    });
};


const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);
    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            id: true,
            email: true,
            password: true,
            name: true
        }
    });


    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    return await createToken({
        id: user.id,
        email: user.email,
        name: user.name,
    })

};


const get = async (email) => {
    email = validate(getUserValidation, email);
    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        },
        select: {
            email: true,
            name: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "user if not found");
    }

    return user;

};


const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            id: user.id
        }
    });

    if (totalUserInDatabase === 0) {
        throw new ResponseError(404, 'user not found')
    }

    const data = {};
    if (user.name) {
        data.name = user.name;
    }

    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    if (user.avatar) {
        data.avatar = user.avatar;
    }



    return prismaClient.user.update({
        where: {
            id: user.id
        },
        data: data,
        select: {
            email: true,
            name: true,
            avatar: true
        }
    });
};

const remove = async (userId) => {
    userId = validate(getUserValidation, userId);
    console.log(userId)

    const user = await prismaClient.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new ResponseError(404, 'user not found')
    }



    return prismaClient.user.delete({
        where: {
            id: userId
        }
    });
};

export default {
    register,
    login,
    get,
    update,
    remove
};