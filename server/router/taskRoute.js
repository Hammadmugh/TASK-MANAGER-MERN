import express from "express";
import task from "../controller/taskController.js";

const route = express.Router();

route.post("/add", task.createTask);
route.get("/tasks", task.getTasks);
route.get("/task/:id", task.getTask);
route.get("/incomplete", task.incompleteTask);
route.put("/task/:id", task.updateTask);
route.delete("/task/:id", task.deleteTask);
route.delete("/completed", task.deleteCompleted);

export default route;
