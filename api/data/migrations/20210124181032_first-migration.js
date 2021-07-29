exports.up = async (knex) => {
  await knex.schema
    .createTable("Users", (users) => {
      users.increments("UserId");
      users.string("User_name", 200).notNullable().unique();
      users.string("password", 200).notNullable();
      users.string("phoneNumber");
      users.timestamps(false, true);
    })
    .createTable("Plants", (plants) => {
      plants.increments("plantId");
      plants.string("nickname", 100).notNullable().unique();
      plants.string("species", 100).notNullable();
      plants.string("h2oFrequency");
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("Plants").dropTableIfExists("Users");
};
