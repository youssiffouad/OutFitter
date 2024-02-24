const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "outfitter";

//Sign UP function
const signUp = async (userData) => {
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;
  console.log("here is the user data sent to backend", userData);
  const payload = { name: userData.username, password: userData.password };

  // Create a new user
  return await User.create(payload);
};

// userServices.js

const signIn = async (username, password) => {
  try {
    const userFromDB = await User.findOne({ where: { name: username } });
    console.log("here is hte user i got from database", userFromDB);
    if (!userFromDB || userFromDB == null) {
      throw new Error("username doesnot exist");
    }
    const passwordValid = await bcrypt.compare(password, userFromDB.password);
    if (!passwordValid) {
      console.log("password isnot vald");
      throw new Error("password is not valid");
    }
    const token = jwt.sign(
      { id: userFromDB.id, username: userFromDB.name },
      secretKey,
      { expiresIn: "2h" }
    );
    console.log("i generated token ----->", token);

    return { token, id: userFromDB.id };
  } catch (error) {
    throw error;
  }
};

//fn to change password
const ChangePassword = async (username, userEmail) => {
  const userFromDB = User.findOne({
    where: { name: username, email: userEmail },
  });
  if (!emailMatch) {
    throw new Error("email doesnot match");
  }
  return userFromDB;
};

//fn to view all users
const viewAllUsers = async () => {
  return await User.findAll();
};

//fn to upload new profile photo
const uploadPhoto = async (file, userId) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }
  console.log("here is the selected user", user);
  const photoUrl = file.path;
  user.profile_photo = photoUrl;
  await user.save();

  return "Photo uploaded successfully";
};

//fn to get certain profile photo
const getProfilePhoto = async (id) => {
  try {
    const user = await User.findByPk(id);
    const photoURl = user.get("profile_photo");
    console.log("here is the photo url", photoURl);
    return photoURl;
  } catch (err) {
    console.log("an error occured in getProfilePhoto service of user", err);
    throw err;
  }
};
//getProfilePhoto(9);

module.exports = {
  signIn,
  signUp,
  ChangePassword,
  viewAllUsers,
  uploadPhoto,
  getProfilePhoto,
};
