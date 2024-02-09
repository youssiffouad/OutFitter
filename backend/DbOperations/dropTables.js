const { Sequelize } = require("sequelize");
const dbpath = require("../models/sequelizeInstance");
const sequelize = new Sequelize({ dialect: "sqlite", storage: dbpath });
const operate = async () => {
  await sequelize
    .drop()
    .then(() => console.log("All tables dropped!"))
    .catch((err) => console.log(err));

  await sequelize
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
};

operate();
