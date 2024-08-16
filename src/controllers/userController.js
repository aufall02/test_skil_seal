import userService from "../service/userService.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};


const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const email = req.user.email;
        const result = await userService.get(email);
        res.status(200).json({
            data: result
        });

    } catch (e) {
        next(e);
    }
};


const update = async (req, res, next) => {
    try {
        const id = req.user.id;
        const request = req.body;
        request.id = id

        const result = await userService.update(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        await userService.remove(req.params.userId)
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
};


export default {
    register,
    login,
    get,
    update,
    remove
};