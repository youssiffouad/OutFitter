const { Sequelize } = require("sequelize");
const sequelize = require("../models/sequelizeInstance");

sequelize
  .query(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
    { type: Sequelize.QueryTypes.SELECT }
  )
  .then((tables) => {
    console.log("Tables in the database:");
    tables.forEach((table) => {
      console.log(table.name);
    });
  })
  .catch((err) => console.error("Error fetching table names:", err));
