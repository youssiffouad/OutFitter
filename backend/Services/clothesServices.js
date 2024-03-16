const Clothes = require("../models/Clothes");

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
    const path = await clothesItem.get("photo");
    console.log("here is the path i got ", path);
    await clothesItem.destroy();
    return path;
  } catch (err) {
    console.log("failed to delete clothes item", err);
    throw err;
  }
};

module.exports = { addToFavourites, deleteClothesItem };
