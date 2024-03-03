const ClothesServices = require("../Services/clothesServices");
const fs = require("fs");

//fn to add clothes item of certain user to favourites
const addTofavourites = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("here is the clothes id i received", id, req.body);
    const msg = await ClothesServices.addToFavourites(id);
    res.status(200).json({ message: msg });
  } catch (err) {
    console.log("failed to add to favourites", err);
    res.status(500).json({ error: err });
  }
};

//controller to delete certain clothes item
const deleteClothesItem = async (req, res) => {
  try {
    const { id } = req.body;
    const path = await ClothesServices.deleteClothesItem(id);
    fs.rm(path, (err) => {
      if (err) {
        console.log("failed to delete the file");
        throw new Error("failed to delete fiel ");
      } else {
        console.log("successfully delted the file");
        res
          .status(200)
          .json({ message: "successfully deleted the clothes photo" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { addTofavourites, deleteClothesItem };
