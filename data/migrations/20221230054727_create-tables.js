/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTableIfNotExists("projects", tbl=>{
    tbl.increments("project_id");
    tbl.text("project_name")
        .notNullable();
    tbl.text("project_description");
    tbl.boolean("project_completed")
        .defaultTo(false);
  })
  .createTableIfNotExists("resources",tbl=>{
    tbl.increments("resource_id");
    tbl.text("resource_name")
        .notNullable()
        .unique();
    tbl.text("resource_description")
  })
  .createTableIfNotExists("tasks",tbl=>{
    tbl.increments("task_id");
    tbl.text("task_description").notNullable();
    tbl.text("task_notes");
    tbl.boolean("task_completed")
        .defaultTo(false);
    tbl.integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
  })
  .createTableIfNotExists("project_resources", tbl=>{
    tbl.increments("id");
    tbl.integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resource_id")
        .inTable("resources")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    tbl.integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
