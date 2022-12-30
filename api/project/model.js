// build your `Project` model here
const db = require("../../data/dbConfig")

const get = async (id) =>{
    let rows
    if(id) {
        rows = await db("projects").where("project_id", id)
    } else {
        rows = await db("projects")
    }

    const result = []
    rows.map(row=>{
        const status = row.project_completed ? true : false;
        result.push({
            project_id: row.project_id,
            project_name: row.project_name,
            project_description: row.project_description,
            project_completed: status
        })
    })

    return result
}

const insert = async (project) =>{
    const id = await db("projects").insert(project)
    const result = await get(id)
    return result[0]
}

module.exports = {get, insert}
