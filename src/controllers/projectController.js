import projectService from "../service/projectService.js";
import taskService from "../service/taskService.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await projectService.create(request);
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
        const {projectId} = req.params;
        const request = req.body;
        console.info(projectId)
        const result = await projectService.update(user, projectId,request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const {projectId} = req.params
        const result = await projectService.get(user, projectId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}


const getAllProject = async (req, res, next) => {
    try {
        const user = req.user;
        const {projectId} = req.params
        const result = await projectService.getAllProject(projectId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const {projectId} = req.params;


        await projectService.remove(user, projectId);

        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
};


export default {
    create,
    update,
    get,
    getAllProject,
    remove
};