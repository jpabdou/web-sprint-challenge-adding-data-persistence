// build your `/api/resources` router here
const express = require("express")
const resourcesRouter = express.Router()
const Resources = require("./model")

resourcesRouter.get("/", async (req,res, next)=>{
    const results = await Resources.get()
    try {
        res.status(200).json(results)
    }
    catch(error) {
        next(error)
    }
})

resourcesRouter.post("/", async (req, res, next)=> {
    const {resource_name} = req.body
    if (resource_name && typeof resource_name === "string" && resource_name.trim().length){
        const match = await Resources.locate(resource_name)
        if (match) {
            next({status: 400, message: "name taken"})
        } else {
            const resource = await Resources.insert(req.body)
            try {
                res.status(200).json(resource)
            } 
            catch(error) {
                next(error)
            }
        }
    } else {
        next({status: 400, message: "name required"})
    }
})

resourcesRouter.use((error, req, res, next)=>{
    res.status(error.status || 500).json({message: error.message || "bad request"})
})



module.exports =resourcesRouter
