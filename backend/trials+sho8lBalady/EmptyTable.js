const Clothes = require("../models/Clothes");
const emptyClothes = async () => {
  await Clothes.destroy({ truncate: true });
};

emptyClothes();
