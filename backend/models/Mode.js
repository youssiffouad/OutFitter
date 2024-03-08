const { DataTypes } = require("sequelize");
const sequelize = require("./sequelizeInstance");

const Mode = sequelize.define(
  "Mode",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

Mode.sync()
  .then(() => console.log("Modes table created successfully"))
  .catch((err) => {
    console.log("failed to create Modes table");
  });
module.exports = Mode;
