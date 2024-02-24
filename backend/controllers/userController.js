// userController.js
const fs = require("fs");
const UserServices = require("../Services/userServices");
const {
  handleSignInError,
  handleSignUpError,
  handlePasswordChangeError,
} = require("../errorHandling/userErrorHandling");

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
    const uploadResult = await UserServices.uploadPhoto(
      req.file,
      req.params.userId
    );
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

module.exports = {
  signIn,
  signUp,
  changePassword,
  viewAllUsers,
  uploadPhoto,
  getProfilePhoto,
};
