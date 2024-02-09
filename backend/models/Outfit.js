const { DataTypes } = require("sequelize");
const sequelize = require("./sequelizeInstance");
const { Sequelize } = require("sequelize");
const User = require("./User");

// Define Outfit model
const Outfit = sequelize.define(
  "Outfit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  { timestamps: false }
);

// Define associations
User.hasMany(Outfit, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Outfit.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "user_id cannot be null" },
    },
  },
});

// Synchronize models with the database
Outfit.sync() // Set force:true to drop existing tables if any and recreate them
  .then(() => {
    console.log("Outfit Table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating table Outfit:", err);
  });

module.exports = Outfit;
