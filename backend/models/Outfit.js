const { DataTypes } = require("sequelize");
const sequelize = require("./sequelizeInstance");
const { Sequelize } = require("sequelize");
const User = require("./User");
const weatherCondition = require("./weatherCondition");
const Mode = require("./Mode");
const Occasion = require("./OccasionTypes");

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
    dayTime: DataTypes.TEXT,
  },
  { timestamps: false }
);

// Define associations
/*
 *** USER and OUTFITS (one to many)
 */
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

/*
 *** OUTFIT reeferences MODES
 */
Mode.hasMany(Outfit, {
  foreignKey: "mode_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Outfit.belongsTo(Mode, {
  foreignKey: {
    name: "mode_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "modeid cannot be null" },
    },
  },
});

/*
 *** OUTFIT references weather
 */
weatherCondition.hasMany(Outfit, {
  foreignKey: "weather_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Outfit.belongsTo(weatherCondition, {
  foreignKey: {
    name: "weather_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "weatherid cannot be null" },
    },
  },
});

/*
 ***OUTFIT references OCCASION
 */
Occasion.hasMany(Outfit, {
  foreignKey: "occasion_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Outfit.belongsTo(Occasion, {
  foreignKey: {
    name: "occasion_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "occasionid cannot be null" },
    },
  },
});

// Synchronize models with the database
Outfit.sync({}) // Set force:true to drop existing tables if any and recreate them
  .then(() => {
    console.log("Outfit Table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating table Outfit:", err);
  });

module.exports = Outfit;
