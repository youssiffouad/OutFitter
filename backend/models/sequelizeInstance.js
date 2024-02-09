const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const databasePath = path.join(
  "D:/projects/Outfitter/backend/models",
  "OutfitDB.db"
);
const sequelize = new Sequelize({ dialect: "sqlite", storage: databasePath });
module.exports = sequelize;
