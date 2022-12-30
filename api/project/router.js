// build your `/api/projects` router here
const express = require("express");
const projectsRouter = express.Router();
const Projects = require("./model");

projectsRouter.get("/", async (req, res, next)=>{
    const projects = await Projects.get();
    try {
        res.status(200).json(projects);
    } catch(error) {
        next(error);
    }
});

projectsRouter.post("/", async (req, res, next)=>{
    const {project_name} = req.body;
    if (project_name && typeof project_name === "string" && project_name.trim().length) {
        const project = await Projects.insert(req.body);
        try {
            res.status(200).json(project)
        }
        catch(error) {
            next(error)
        }
    } else {
        next({status:404, message: "project_name required"})
    }

});

projectsRouter.use((error, req, res, next)=>{
        res.status(error.status || 500 ).json({message: error.message || "bad request"});
});


module.exports =projectsRouter;
