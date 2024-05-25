const { DataTypes } = require("sequelize");
const sequelize = require("./sequelizeInstance");
const User = require("./User");
const WeatherCondition = require("./weatherCondition");
const CLothesCategory = require("./ClothesCategory");
const Material = require("./Material");

const Clothes = sequelize.define(
  "Clothes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    favourite: { type: DataTypes.BOOLEAN },
  },
  { timestamps: false }
);

//association between clothes and  CLothesCategory
CLothesCategory.hasMany(Clothes, {
  foreignKey: "clothesCategory_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Clothes.belongsTo(CLothesCategory, {
  foreignKey: {
    name: "clothesCategory_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "clothesCategory_id cannot be null" },
    },
  },
});

//association between clothes and weather conditions
WeatherCondition.hasMany(Clothes, {
  foreignKey: "weatherCondition_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Clothes.belongsTo(WeatherCondition, {
  foreignKey: {
    name: "weatherCondition_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "clothesCategory_id cannot be null" },
    },
  },
});

// Association between Clothes and User
User.hasMany(Clothes, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Clothes.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "user_id cannot be null" },
    },
  },
});

// Association between Clothes and Material
Material.hasMany(Clothes, {
  foreignKey: "material_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Clothes.belongsTo(Material, {
  foreignKey: {
    name: "material_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "material_id cannot be null" },
    },
  },
});

Clothes.sync()
  .then(() => console.log("success creating the Clothes table "))
  .catch((err) => console.log("failed to create Clothes table ", err));

module.exports = Clothes;
