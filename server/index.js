import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoute from "./router/taskRoute.js";

import "./config/db.js";

dotenv.config();
const App = express();
App.use(express.json());
App.use(cors());

App.use(taskRoute);

const port = process.env.PORT || 3000;
App.listen(port, console.log(`Server is running on port ${port}`));
