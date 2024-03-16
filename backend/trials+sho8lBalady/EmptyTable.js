const sequelize = require("../models/sequelizeInstance");
const outfit = require("../models/Outfit");
const OutfitClothes = require("../models/OutfitClothes");

const emptyOutfits = async () => {
  await sequelize.query("DELETE FROM Outfits");
};
const printOutfitClothes = async () => {
  let arr = await OutfitClothes.findAll();
  console.log("flkamgkmdafmnklgvnwefelkvmfel;ev", arr.length);
};
printOutfitClothes();

emptyOutfits();
