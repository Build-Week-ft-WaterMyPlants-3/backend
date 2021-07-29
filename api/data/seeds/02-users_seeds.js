exports.seed = async function (knex) {
  await knex("Users").insert([
    {
      User_name: "Frankie",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      phoneNumber: "901 - 555 - 5555",
    },
    {
      User_name: "Bradley",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      phoneNumber: "937 - 222 - 2222",
    },
  ]);

  await knex("Plants").insert([
    {
      nickname: "Sweet Basil",
      species: "Ocimum basilicum",
      h2oFrequency: "Water very morning",
    },
    {
      nickname: "Rosemary",
      species: "Salvia rosmarinus",
      h2oFrequency: "Water only when very dry. 1-2 times a week",
    },
  ]);
};
