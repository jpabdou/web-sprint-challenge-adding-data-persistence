// build your `/api/tasks` router here
const express = require("express");
const tasksRouter = express.Router();
const Projects = require("../project/model");
const Tasks = require("./model");

tasksRouter.get("/", async(req, res, next)=>{
    const results = await Tasks.get();
    try {
        res.status(200).json(results);
    }
    catch(error) {
        next(error);
    }
})

tasksRouter.post("/", async (req, res, next)=>{
    const {task_description, project_id} = req.body;
    if (task_description && typeof task_description === "string" && task_description.trim().length && project_id && typeof project_id === "number" && project_id>=0) {
        const match = await Projects.get(project_id)
        if (match.length) {
            const result = await Tasks.insert(req.body);
            try {
                res.status(200).json(result);
            }
            catch(error) {
                next(error)
            }

        } else {
            next({status: 404, message: "project_id not found"})
        }
    } else {
        next({status: 400, message: "type_description or project_id not found"})
    }
})

tasksRouter.use((error, req, res, next)=>{
    res.status(error.status || 500).json({message: error.message || "bad request"})
})


module.exports =tasksRouter
