const Clothes = require("../models/Clothes");
const path = require("path");

//fn to add clothes piece to favourites or remove it
const addToFavourites = async (id) => {
  try {
    const clothesItem = await Clothes.findByPk(id);
    const isFav = clothesItem.get("favourite");
    console.log("here is the current favourite state", isFav);
    await clothesItem.update({ favourite: !isFav });
    const msg = isFav
      ? "success removing item from favourites"
      : "success adding item to favourites";
    return msg;
  } catch (err) {
    console.log("failed to add to FFFAAAAAAvs");
    throw err;
  }
};

//fn to delete clothes piece of certain user
const deleteClothesItem = async (id) => {
  try {
    const clothesItem = await Clothes.findByPk(id);
    const filename = await clothesItem.get("photo");
    const filepath = path.join(
      __dirname,
      "../react-outfit-model/src/static",
      filename
    );
    console.log("here is the path i got ", path);
    await clothesItem.destroy();
    return filepath;
  } catch (err) {
    console.log("failed to delete clothes item", err);
    throw err;
  }
};

module.exports = { addToFavourites, deleteClothesItem };
