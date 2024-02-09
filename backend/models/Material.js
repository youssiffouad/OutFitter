const { DataTypes } = require("sequelize");
const sequelize = require("./sequelizeInstance");

const Material = sequelize.define(
  "Material",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { timestamps: false }
);

Material.sync()
  .then(() => console.log("successfully created the material table"))
  .catch((err) => console.log("failed to create the material table"));

module.exports = Material;
