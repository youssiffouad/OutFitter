const { DataTypes } = require("sequelize");
const sequelize = require("./sequelizeInstance");

const OccasionType = sequelize.define(
  "OccasionType",
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

OccasionType.sync()
  .then(() => console.log("successfully created table of occasion type"))
  .catch((err) => console.log("failed to created occsion type table"));

module.exports = OccasionType;
