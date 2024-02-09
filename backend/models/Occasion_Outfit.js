const sequelize = require("./sequelizeInstance");
const { DataTypes } = require("sequelize");
const Outfit = require("./Outfit");
const Occasion = require("./OccasionTypes");

const OccasionOutfit = sequelize.define(
  "OccasionOutfit",
  {},
  { timestamps: false }
);

Outfit.belongsToMany(Occasion, { through: OccasionOutfit });
Occasion.belongsToMany(Outfit, { through: OccasionOutfit });

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });
