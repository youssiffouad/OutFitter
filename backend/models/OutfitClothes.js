const sequelize = require("./sequelizeInstance");
const { DataTypes } = require("sequelize");
const Outfit = require("./Outfit");
const Clothes = require("./Clothes");

const OutfitClothes = sequelize.define(
  "OutfitClothes",
  {},
  { timestamps: false }
);

Outfit.belongsToMany(Clothes, { through: OutfitClothes });
Clothes.belongsToMany(Outfit, { through: OutfitClothes });

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

module.exports = OutfitClothes;
