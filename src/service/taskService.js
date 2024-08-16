import { prismaClient } from "../config/database.js";
import {Prisma} from "@prisma/client";
import {
    createTaskValidation, getTaskValidation, updateTaskValidation,
} from "../validation/taskValidation.js";
import { validate } from "../validation/validate.js";
import {CustomPrismaError} from "../error/customPrismaError.js";
import {ResponseError} from "../error/responsError.js";


const create = async (user, projectId,request) => {
    try {
        const task = validate(createTaskValidation, request);

        const totalTaskInProject = await prismaClient.task.count({
            where: {
                projectId: projectId,
                title: task.title,
            }
        });


        if (totalTaskInProject >= 1) {
            throw new ResponseError(400, "Task already exist");
        }


        const result = await prismaClient.task.create({
            data: {
                title: task.title,
                completed: task.completed,
                User: {
                    connect:{
                        id: user.id,
                    }
                },
                Project: {
                    connect: {
                        id: projectId,
                    }
                }
            },
            select: {
                id: true,
                title: true,
                completed: true,
                User: {
                    select:{
                        name: true
                    }
                },
                Project: true
            },
        });
        return result;
    }catch (error){
        console.log(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new CustomPrismaError(error);
        } else {
            throw error;
        }
    }
};

const get = async (user, projectId,taskId) => {
    taskId = validate(getTaskValidation, taskId);

    const task = await prismaClient.task.findFirst({
        where: {
            userId: user.id,
            projectId: projectId,
            id: taskId,
        },
        select: {
            id: true,
            title: true,
            completed: true,
        },
    });

    if (!task) {
        throw new ResponseError(404, "Task is not found");
    }

    return task;
};


const getAllTask = async (projectId) => {
    const task = await prismaClient.task.findMany({
        where: {
            projectId: projectId,
        },
        select: {
            id: true,
            title: true,
            completed: true,
        },
    });

    if (!task) {
        throw new ResponseError(404, "Task is not found");
    }

    return task;
};

const getMyTask = async (user) => {
    const task = await prismaClient.task.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            title: true,
            completed: true,
        },
    });

    if (!task) {
        throw new ResponseError(404, "Task is not found");
    }

    return task;
};
//
const update = async (user, taskId,projectId,request) => {
    const task = validate(updateTaskValidation, request);

    const totalTaskInDb = await prismaClient.task.count({
        where: {
            projectId: projectId,
            userId: user.id,
            id : taskId,
        }
    });

    if (totalTaskInDb !== 1) {
        throw new ResponseError(404, "Task is not found");
    }

    return prismaClient.task.update({
        where: {
            id: taskId,
        },
        data: {
            title: task.title,
            completed: task.completed,
        },
        select: {
            title: true,
            completed: true,
        },
    });
};

const remove = async (user, taskId) => {
    taskId = validate(getTaskValidation, taskId);

    const totalContactInDb = await prismaClient.task.count({
        where: {
            userId: user.id,
            id: taskId,
        },
    });

    if (totalContactInDb !== 1) {
        throw new ResponseError(404, "contact is not found");
    }

    return prismaClient.task.delete({
        where: {
            id: taskId,
        },
    });
};
//
// const search = async (user, request) => {
//     request = validate(searchContactValidation, request);
//     // 1((page - 1)* size) = 0
//     // 2((page - 1)* size) = 10
//     const skip = (request.page - 1) * request.size;
//
//     const filters = [];
//     filters.push({
//         username: user.username,
//     });
//
//     if (request.name) {
//         filters.push({
//             OR: [
//                 {
//                     first_name: {
//                         contains: request.name,
//                     },
//                 },
//                 {
//                     last_name: {
//                         contains: request.name,
//                     },
//                 },
//             ],
//         });
//     }
//
//     if (request.email) {
//         filters.push({
//             email: {
//                 contains: request.email,
//             },
//         });
//     }
//
//     if (request.phone) {
//         filters.push({
//             phone: {
//                 contains: request.phone,
//             },
//         });
//     }
//
//     const contacts = await prismaClient.contact.findMany({
//         where: {
//             AND: filters,
//         },
//         take: request.size,
//         skip: skip,
//     });
//
//     const totalItems = await prismaClient.contact.count({
//         where: {
//             AND: filters,
//         },
//     });
//
//     return {
//         data: contacts,
//         paging: {
//             page: request.page,
//             total_item: totalItems,
//             total_page: Math.ceil(totalItems / request.size)
//         },
//     };
// };

export default {
    create,
    get,
    getAllTask,
    getMyTask,
    update,
    remove,
    // search,
};
