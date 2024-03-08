const Clothes = require("../models/Clothes");
const userServices = require("../Services/userServices");
const outfitServices = require("../Services/outfitServices");
/*
 ***  controller to generate new Outfit
 */
const generateNewOutfit = async (req, res) => {
  try {
    const userid = req.user.id;
    const { mode, weather, occasion, daytime } = req.body;
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
    await outfitServices.addNewOutfit([1, 2, 3], {
      mode,
      weather,
      occasion,
      daytime,
    });
    res.status(200).json({ message: "success adding generating outfit" });
  } catch (err) {
    console.log("an error occured while generatng new Outfit", err);
    res.status(500).json(err);
  }
};
