const Clothes = require("../models/Clothes");
const { execFile } = require("child_process");
const { ReplaceUrlwithData } = require("../middleware/replaceURlwithData");
const userServices = require("../Services/userServices");
const outfitServices = require("../Services/outfitServices");
const fs = require("fs");
const path = require("path");
const Outfit = require("../models/Outfit");
/*
 ***  controller to generate new Outfit for certain user
 */
const generateNewOutfit = async (req, res) => {
  try {
    const userid = req.user.id;

    const { mode, weatherCondition, occasion, dayornight } = req.body;

    const PhotosWithURLS = await userServices.getAllClothes(userid);
    // // Iterate through clothesData and replace photo URL with photo itself
    // for (const clothPhoto of PhotosWithURLS) {
    //   const photoPath = clothPhoto.photo; // where the property photo is photoPath
    //   const photoData = fs.readFileSync(photoPath);
    //   //const photoBase64 = Buffer.from(photoData).toString("base64");
    //   // Replace the photo path with the  photo data
    //   clothPhoto.photo = photoData;
    // }
    // Set the folder path
    const folderPath = path.join(__dirname, "../assets/ClothesPhoto");
    /*
     *** sth should happen with the AI where the model will receive ( mode,weather,occasion,daytime and PhotosWithURLS with their IDS)
     *** NOW I MODIFIED THE CODE SO FILE NAME IS THE SAME AS THE PHOTO ID
     *** and return 3 ids of 3 photos
     *** I SHOULD CALL PYTHON SCRIPT THAT TAKES AS AARGUMENT PATH OF FOLDER CONTAINING PHOTOS AND RETURN
     *** 3 IDs REPRESENTING THE PHOTOS FILE NAMES
     */

    // Function to call the Python script
    const getChosenIds = async (certianfolderPath) => {
      return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, "../../selectPhotos.py");
        execFile(
          "python",
          [scriptPath, certianfolderPath],
          (error, stdout, stderr) => {
            if (error) {
              reject(`Error: ${error.message}`);
            } else if (stderr) {
              reject(`Error: ${stderr}`);
            } else {
              const ids = stdout.trim().split(" ").map(Number);
              resolve(ids);
            }
          }
        );
      });
    };

    let chosenIds = await getChosenIds(folderPath);
    console.log("here are the chosen Ids", chosenIds);
    let outfitGenerated = await outfitServices.addNewOutfit(chosenIds, {
      mode,
      weatherCondition,
      occasion,
      dayornight,
      userid,
    });
    for (let i = 0; i < outfitGenerated.Clothes.length; i++) {
      const photoPath = path.join(
        __dirname,
        "../assets/clothesPhoto",
        outfitGenerated.Clothes[i].photo
      );
      outfitGenerated.Clothes[i].photo = await ReplaceUrlwithData(photoPath);
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
