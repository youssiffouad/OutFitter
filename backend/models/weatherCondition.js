const { DataTypes } = require("sequelize");
const sequelize = require("./sequelizeInstance");

const WeatherCondition = sequelize.define(
  "WeatherCondition",
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

WeatherCondition.sync()
  .then(() => console.log("weather conditions table created successfully"))
  .catch((err) => {
    console.log("failed to create weather condition table");
  });
module.exports = WeatherCondition;
