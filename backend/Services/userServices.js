const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "outfitter";

//Sign UP function
const signUp = async (userData) => {
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  // Create a new user
  return await User.create(userData);
};

// userServices.js

const signIn = async (username, password) => {
  try {
    const userFromDB = await User.findOne({ where: { name: username } });
    if (!userFromDB) {
      throw new Error("username doesnot exist");
    }
    const passwordValid = await bcrypt.compare(password, userFromDB.password);
    if (!passwordValid) {
      throw new Error("password is not valid");
    }
    const token = jwt.sign(
      { id: userFromDB.id, username: userFromDB.name },
      secretKey,
      { expiresIn: "2h" }
    );

    return token;
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

module.exports = { signIn, signUp, ChangePassword };
