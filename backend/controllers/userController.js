// userController.js
const fs = require("fs");
const UserServices = require("../Services/userServices");
const {
  handleSignInError,
  handleSignUpError,
  handlePasswordChangeError,
} = require("../errorHandling/userErrorHandling");
const { ReplaceUrlwithData } = require("../middleware/replaceURlwithData");

const signIn = async (req, res) => {
  try {
    console.log("I RECEIVED REQUEST HERE AT SIGN IN");
    const { name, password } = req.body;
    const { token, id } = await UserServices.signIn(name, password);
    res.status(200).json({ message: "successfully logged in", token, id });
  } catch (err) {
    console.log("an error occured", err);
    const { status, message } = handleSignInError(err);
    console.log("here is the satus and message", status, message);
    res.status(status).json({ error: message });
  }
};

const signUp = async (req, res) => {
  try {
    console.log("i received request at sign up");
    const userData = req.body;
    const newUser = await UserServices.signUp(userData);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    const { status, message } = handleSignUpError(error);
    res.status(status).json({ error: message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { username, userEmail } = req.body;
    const user = await UserServices.ChangePassword(username, userEmail);
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    const { status, message } = handlePasswordChangeError(error);
    res.status(status).json({ error: message });
  }
};

const viewAllUsers = async (req, res) => {
  try {
    const users = await UserServices.viewAllUsers();
    console.log("here are all the users", users);

    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "interanl server error failed to get users" });
  }
};

const uploadPhoto = async (req, res) => {
  try {
    console.log(
      "here is the request.file i received at user controller",
      req.file
    );
    const id = req.user.id;
    const uploadResult = await UserServices.uploadPhoto(req.file, id);
    res.send(uploadResult);
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).send("Internal Server Error");
  }
};
const getProfilePhoto = async (req, res) => {
  try {
    const id = req.user.id;
    const photoPath = await UserServices.getProfilePhoto(id);
    fs.readFile(photoPath, (err, data) => {
      if (err) {
        console.log("error in cb", err);
        throw err;
      }
      console.log("here is the phtot", data);
      res.setHeader("Content-Type", "image/png"); // Adjust content type based on your photo type
      res.send(data);
    });
  } catch (err) {
    console.log("an error occured in get profile photo controller", err);
    res.status(500).json({ error: "failed to get photo from server" });
  }
};

// Controller to get all clothes of a certain user
const fetchAllClothes = async (req, res) => {
  try {
    const id = req.user.id;
    const clothesData = await UserServices.getAllClothes(id);

    // Iterate through clothesData and replace photo URL with photo itself
    for (const cloth of clothesData) {
      const photoPath = cloth.photo; // where the property photo is photoPath
      const photoData = fs.readFileSync(photoPath);
      const photoBase64 = Buffer.from(photoData).toString("base64");
      // Replace the photo path with base64 encoded photo data
      cloth.photo = photoBase64;
    }

    // Send the modified clothesData as the response
    res.status(200).json({
      message: "successfully fetched clothes from server",
      clothesData,
    });
  } catch (err) {
    // Handle errors
    console.error("error fetching data", err);
    res.status(500).json({ error: err.message });
  }
};
/*
 *** controller to fetch all Outfits for cerain user
 */
const fetchAllOutfits = async (req, res) => {
  try {
    const id = req.user.id;
    let outfits = await UserServices.getAllOutfits(id);

    // Iterate through clothes inside every outfit and replace photo URL with photo itself
    for (let i = 0; i < outfits.length; i++) {
      for (let j = 0; j < outfits[i].Clothes.length; j++) {
        outfits[i].Clothes[j].photo = await ReplaceUrlwithData(
          outfits[i].Clothes[j].photo
        );
      }
    }

    // Send the modified outfits as the response
    res.status(200).json({
      message: "successfully fetched outfits from server",
      outfits,
    });
  } catch (err) {
    // Handle errors
    console.error("error fetching data", err);
    res.status(500).json({ error: err.message });
  }
};

//controller to add new piece of clothes for certain user
const addNewClothesPiece = async (req, res) => {
  try {
    console.log(
      "here is the reuqest . user ---------------------------->",
      req.user
    );
    const userid = req.user.id;
    const photoURl = req.file.path;
    console.log("here is the poturl at contoller ----------->", photoURl);
    const { weatherCondition, material, description, clothesCategory } =
      req.body;
    await UserServices.addNewPiece(
      userid,
      weatherCondition,
      material,
      description,
      clothesCategory,
      photoURl
    );
    res
      .status(200)
      .json({ message: "successfully added new Piece of clothes" });
  } catch (err) {
    console.log("an error occured while adding new Piece of clothes", err);
    res
      .status(500)
      .json({ message: "internal server error failed to add new Piece", err });
  }
};

module.exports = {
  signIn,
  signUp,
  changePassword,
  viewAllUsers,
  uploadPhoto,
  getProfilePhoto,
  addNewClothesPiece,
  fetchAllClothes,
  fetchAllOutfits,
};
