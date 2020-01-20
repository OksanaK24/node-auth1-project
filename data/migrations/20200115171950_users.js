exports.up = async (knex) => {
    await knex.schema.createTable("users", (users) => {
      users.increments()
      users.string("username")
        .notNullable()
        .unique()
      users.string("password")
        .notNullable()
    })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("users")
  }