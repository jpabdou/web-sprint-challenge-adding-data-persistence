// build your `Resource` model here
const db = require("../../data/dbConfig")

const get = async (id) => {
    let rows
    if (id>= 0) {
        rows = await db("resources").where("resource_id", id).first()
    } else {
        rows = await db("resources")
    }
    return rows
}

const locate = async (name) =>{
    const row = await db("resources").where("resource_name", name).first()
    return row
}

const insert = async (resource) => {
    const id = await db("resources").insert(resource)
    const row = await get(id)
    return row
}

module.exports = {get, locate,insert}
