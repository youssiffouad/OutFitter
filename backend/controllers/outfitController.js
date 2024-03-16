const Clothes = require("../models/Clothes");
const { ReplaceUrlwithData } = require("../middleware/replaceURlwithData");
const userServices = require("../Services/userServices");
const outfitServices = require("../Services/outfitServices");
const fs = require("fs");
const Outfit = require("../models/Outfit");
/*
 ***  controller to generate new Outfit
 */
const generateNewOutfit = async (req, res) => {
  try {
    const userid = req.user.id;

    const { mode, weatherCondition, occasion, dayornight } = req.body;

    const PhotosWithData = await userServices.getAllClothes(userid);
    // Iterate through clothesData and replace photo URL with photo itself
    for (const clothPhoto of PhotosWithData) {
      const photoPath = clothPhoto.photo; // where the property photo is photoPath
      const photoData = fs.readFileSync(photoPath);
      //const photoBase64 = Buffer.from(photoData).toString("base64");
      // Replace the photo path with the  photo data
      clothPhoto.photo = photoData;
    }

    /*
     *** sth should happen with the AI where the model will receive ( mode,weather,occasion,daytime and PhotosWithData )
     *** and return 3 ids of 3 photos
     */
    let outfitGenerated = await outfitServices.addNewOutfit([4, 5, 6], {
      mode,
      weatherCondition,
      occasion,
      dayornight,
      userid,
    });
    for (let i = 0; i < outfitGenerated.Clothes.length; i++) {
      outfitGenerated.Clothes[i].photo = await ReplaceUrlwithData(
        outfitGenerated.Clothes[i].photo
      );
    }
    console.log("her eis the outfit", outfitGenerated);
    res.status(200).json({
      message: "success adding generating outfit",
      outfit: outfitGenerated,
    });
  } catch (err) {
    console.log("an error occured while generatng new Outfit", err);
    res.status(500).json(err);
  }
};

/*
 ***controller to add certain outfit to favourites
 */
const addToFavourites = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("here is the outfit id i received", id, req.body);
    const msg = await outfitServices.AddToFavourites(id);
    res.status(200).json({ message: msg });
  } catch (err) {
    console.log("failed to add to favourites", err);
    res.status(500).json({ error: err });
  }
};

/*
 *** controller to delete certian outfit
 */
const deleteOutfit = async (req, res) => {
  try {
    const { id } = req.body;
    await outfitServices.deleteOutfit(id);
    res.status(200).json({ message: "successfully deleted the outfit" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { generateNewOutfit, addToFavourites, deleteOutfit };
