import taskService from '../service/taskService.js';
import contactService from "@prisma/client/generator-build";
const create = async (req, res, next) => {
    try {
        const user = req.user;
        const projectId = req.params.projectId;
        const request = req.body;
        console.log(projectId,'dsfs')
        const result = await taskService.create(user,projectId,request);
        res.status(201).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};


const get = async (req, res, next) => {
    try {
        const user = req.user;
        const {projectId, taskId} = req.params
        const result = await taskService.get(user, projectId, taskId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const getAllTask = async (req, res, next) => {
    try {
        const user = req.user;
        const {projectId} = req.params
        const result = await taskService.getAllTask(projectId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const getMyTask = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await taskService.getMyTask(user);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const {projectId,taskId} = req.params;
        const request = req.body;

        const result = await taskService.update(user, taskId,projectId,request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};
//
const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const taskId = req.params.taskId;


        await taskService.remove(user, taskId);

        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
};
//
// const search = async (req, res, next) => {
//     try {
//         const user = req.user
//         const request = {
//             name: req.query.name,
//             email: req.query.email,
//             phone: req.query.phone,
//             page: req.query.page,
//             size: req.query.size
//         }
//
//
//         const result = await contactService.search(user, request)
//         res.status(200).json({
//             data: result.data,
//             paging: result.paging
//         })
//     } catch (e) {
//         next(e)
//     }
// };



export default {
    create,
    get,
    getAllTask,
    getMyTask,
    update,
    remove,
    // search
};