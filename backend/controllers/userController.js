// userController.js

const UserServices = require("../Services/userServices");
const {
  handleSignInError,
  handleSignUpError,
  handlePasswordChangeError,
} = require("../errorHandling/userErrorHandling");

const signIn = async (req, res) => {
  try {
    const { name, password } = req.body;
    const token = await UserServices.signIn(name, password);
    res.status(200).json({ message: "successfully logged in", token });
  } catch (err) {
    const { status, message } = handleSignInError(err);
    res.status(status).json({ error: message });
  }
};

const signUp = async (req, res) => {
  try {
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
    const { status, message } = han(error);
    res.status(status).json({ error: message });
  }
};

module.exports = { signIn, signUp };
