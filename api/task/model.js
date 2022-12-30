// build your `Task` model here
const db = require("../../data/dbConfig");

const get = async id =>{
    let rows;
    if(id >= 0) {
        rows = await db("tasks as t")
            .leftJoin("projects as p", "t.project_id", "p.project_id")
            .select("t.*")
            .where("task_id", id);
    } else {
        rows = await db("tasks as t")
            .leftJoin("projects as p", "t.project_id", "p.project_id")
            .select("t.*", "p.project_name", "p.project_description");
    }
    const result = [];
    rows.map(row=>{
        const status = row.task_completed === 1 ? true : false
        const data = {...row, task_completed: status}
        result.push(data)
    })
    return result;
}

const insert = async task =>{
    const id = await db("tasks").insert(task);
    const result = await get(id[0]);
    return result[0]
}

module.exports = {get, insert}
