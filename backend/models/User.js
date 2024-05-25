const { DataTypes } = require("sequelize");
const sequelize = require("./sequelizeInstance");
const { Sequelize } = require("sequelize");

// Define models for each table
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
    password: DataTypes.TEXT,
    email: {
      type: DataTypes.TEXT,
      unique: true,
    },
    profile_photo: DataTypes.TEXT,
    registration_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
  }
);

// Synchronize models with the database
User.sync() // Set force:true to drop existing tables if any and recreate them
  .then(() => {
    console.log(" Users created successfully.");
  })
  .catch((err) => {
    console.error("Error creating Users tables:", err);
  });

module.exports = User;
