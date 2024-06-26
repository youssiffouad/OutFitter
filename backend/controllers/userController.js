// userController.js
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const UserServices = require("../Services/userServices");
const {
  handleSignInError,
  handleSignUpError,
  handlePasswordChangeError,
} = require("../errorHandling/userErrorHandling");
const { ReplaceUrlwithData } = require("../middleware/replaceURlwithData");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3060/user/auth/google/callback";
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

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
      const photoPath = path.join(
        __dirname,
        "../react-outfit-model/src/static",
        cloth.photo
      ); //where the property photo is just the file name

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
        const photoPath = path.join(
          __dirname,
          "../react-outfit-model/src/static",
          outfits[i].Clothes[j].photo
        ); //where the property photo is just the file name
        outfits[i].Clothes[j].photo = await ReplaceUrlwithData(photoPath);
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
  const { weatherCondition, material, description, clothesCategory } = req.body;
  const userid = req.user.id;
  console.log(
    "(3)-here isssssssssssssssssssssssssssssssssss th req.body",
    req.body
  );
  console.log(
    "(3)-here isssssssssssssssssssssssssssssssssss th user id",
    userid
  );
  console.log(
    "(3)-here isssssssssssssssssssssssssssssssssss th req.file",
    req.file
  );

  try {
    const newClothes = await UserServices.addNewPiece(
      userid,
      weatherCondition,
      material,
      description,
      clothesCategory,
      req.file
    );

    res.status(201).json({
      clothes: newClothes,
      message: "success adding new clothes piece",
    });
  } catch (err) {
    console.log("Failed to add new clothes piece for certain user", err);
    res.status(500).json({ error: "Failed to add new clothes piece" });
  }
};

//controller to handle google auth
const GoogleAuth = async (req, res) => {
  console.log(
    "i am in the controllerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr auth/google"
  );
  const redirectUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    prompt: "select_account", // Force user to select account
  });
  res.redirect(redirectUrl);
};

//controller to handle gooogle auth CALLBACK
const CallBackGoogleAuth = async (req, res) => {
  const code = req.query.code;
  console.log("here is the code", code);
  try {
    const { tokens } = await client.getToken(code);
    console.log("heree are the tokeens", tokens);
    client.setCredentials(tokens);
    const { data } = await client.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });
    console.log("here is hte data", data);
    let user = await UserServices.findByGmail(data.email);
    console.log("here is the user", user);
    if (!user) {
      // User doesn't exist, create a new user
      console.log(
        "userrrrrrrrrrrrrrrrrrrrrrrr doesnnnnnnnnnnnnnnnnnnnnnnnotttttttttttt exiiiistttttttt"
      );
      user = await UserServices.createUserFromGoogle({
        name: data.name,
        email: data.email,
      });
    }
    const token = jwt.sign({ id: user.id, username: user.name }, "outfitter", {
      expiresIn: "24h",
    });
    res.redirect(`http://localhost:3000/login?token=${token}`);
  } catch (error) {
    console.error("Error retrieving access token:", error.message);
    res.status(500).send("Failed to retrieve access token");
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
  GoogleAuth,
  CallBackGoogleAuth,
};
