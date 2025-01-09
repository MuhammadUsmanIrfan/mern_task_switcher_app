import {Router} from "express";
import {addTask, getTask, changeTaskColumn} from "../controllers/taskController.js";
const routes = Router()

routes.post("/add-task", addTask)
routes.get("/get-tasks", getTask)

routes.patch("/task-column-update", changeTaskColumn)

export default routes