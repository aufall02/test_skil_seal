import { prismaClient } from "../config/database.js";
import { ResponseError } from "../error/responsError.js";
import {
    createProjectValidation, getProjectValidation, updateProjectValidation,
} from "../validation/projectValidation.js";
import { validate } from "../validation/validate.js";
import {getTaskValidation, updateTaskValidation} from "../validation/taskValidation.js";

const create = async (request) => {
    const project = validate(createProjectValidation, request);

    return prismaClient.project.create({
        data: {
            name: project.name
        },
        select: {
            id: true,
            name: true
        }
    });
};

const update = async (user, projectId,request) => {
    const project = validate(updateProjectValidation, request);

    const totalProjectInDb = await prismaClient.project.count({
        where: {
            id: projectId,
        }
    });

    if (totalProjectInDb !== 1) {
        throw new ResponseError(404, "Project is not found");
    }

    return prismaClient.project.update({
        where: {
            id: projectId,
        },
        data: {
            name: project.name,
        },
        select: {
            name: true,
            tasks: {
                select: {
                    id: true,
                    title: true,
                    completed: true,
                }
            }
        },
    });
};


const get = async (user, projectId) => {
    projectId = validate(getProjectValidation, projectId);

    const project = await prismaClient.project.findFirst({
        where: {
            id: projectId,
        },
        select: {
            name: true,
            tasks: {
                select: {
                    id: true,
                    title: true,
                    completed: true,
                }
            }
        },
    });

    if (!project) {
        throw new ResponseError(404, "Task is not found");
    }
    return project;
};
const getAllProject = async (projectId) => {
    const task = await prismaClient.project.findMany({
        select: {
            id: true,
            name: true
        },
    });

    if (!task) {
        throw new ResponseError(404, "Task is not found");
    }

    return task;
};


const remove = async (user, projectId) => {
    projectId = validate(getProjectValidation, projectId);

    const totalProjectInDb = await prismaClient.project.count({
        where: {
            id: projectId,
        },
    });

    if (totalProjectInDb !== 1) {
        throw new ResponseError(404, "project is not found");
    }

    return prismaClient.project.delete({
        where: {
            id: projectId,
        },
    });
};


export default {
    create,
    update,
    get,
    getAllProject,
    remove
};
