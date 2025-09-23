import express from "express";
import task from "../controllers/taskController.js";
import authorize from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/add", authorize, task.createTask);
route.get("/tasks", authorize, task.getTasks);
route.get("/task/:id", authorize, task.getTask);
route.get("/incomplete", authorize, task.incompleteTask);
route.put("/task/:id", authorize, task.updateTask);
route.delete("/task/:id", authorize, task.deleteTask);
route.delete("/completed", authorize, task.deleteCompleted);

export default route;
