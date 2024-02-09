const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelizeInstance");

const CLothesCategory = sequelize.define(
  "CLothesCategory",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

CLothesCategory.sync()
  .then(() => console.log("weather conditions table created successfully"))
  .catch((err) => console.log("failed to create wether conditions table", err));
module.exports = CLothesCategory;
