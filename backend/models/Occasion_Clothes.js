const sequelize = require("./sequelizeInstance");
const { DataTypes } = require("sequelize");
const Clothes = require("./Clothes");
const Occasion = require("./OccasionTypes");

const OccasionClothes = sequelize.define(
  "OccasionClothes",
  {},
  { timestamps: false }
);

Clothes.belongsToMany(Occasion, { through: OccasionClothes });
Occasion.belongsToMany(Clothes, { through: OccasionClothes });

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });
