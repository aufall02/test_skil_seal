import {Router} from "express";
import userController from "../controllers/userController.js";
import { authenticateJWT } from "../middleware/auth.js";
import taskController from "../controllers/taskController.js";
import projectController from "../controllers/projectController.js";

const api = Router()
api.use(authenticateJWT);

// USER API
api.get('/api/users/current', userController.get);
api.get('/api/users/tasks', taskController.getMyTask);
api.put('/api/users/current', userController.update);
api.delete('/api/users/:userId', userController.remove);


// PROJECT  API
api.post('/api/projects', projectController.create);
api.get('/api/projects', projectController.getAllProject);
api.get('/api/projects/:projectId', projectController.get);
api.put('/api/projects/:projectId', projectController.update);
api.delete('/api/projects/:projectId', projectController.remove);

// TASK API
api.post('/api/projects/:projectId/tasks', taskController.create);
api.get('/api/projects/:projectId/tasks', taskController.getAllTask);
api.get('/api/projects/:projectId/tasks/:taskId', taskController.get);
api.put('/api/projects/:projectId/tasks/:taskId', taskController.update);
api.delete('/api/projects/:projectId/tasks/:taskId', taskController.remove);


export { api };