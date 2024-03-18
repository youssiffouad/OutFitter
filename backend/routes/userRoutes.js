const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const photoUpload = require("../middleware/profilePhotoHandler");
const TVMW = require("../middleware/tokenVerification");
const { OAuth2Client } = require("google-auth-library");
const UserServices = require("../Services/userServices");
const jwt = require("jsonwebtoken");

const CLIENT_ID =
  "236650158232-4mt1r5mfsve5nh4fbjp79iqojvqi7nqf.apps.googleusercontent.com"; // Replace with your client ID
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3060/user/auth/google/callback";
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

router.post("/login", userController.signIn);
router.post("/signup", userController.signUp);
router.get("/changepassword", userController.changePassword);
router.get("/view", userController.viewAllUsers);
router.post(
  "/uploadprofilephoto",
  TVMW.verifyToken,
  photoUpload.storageHandler.single("photo"),
  userController.uploadPhoto
);
router.get(
  "/getProfilePhoto",
  TVMW.verifyToken,
  userController.getProfilePhoto
);
router.post(
  "/addNewClothesPiece",
  TVMW.verifyToken,
  photoUpload.storageHandler.single("clothesimg"),
  userController.addNewClothesPiece
);

router.get(
  "/fetchAllClothes",
  TVMW.verifyToken,
  userController.fetchAllClothes
);
router.get(
  "/fetchAllOutfits",
  TVMW.verifyToken,
  userController.fetchAllOutfits
);
router.post("/getToken", TVMW.verifyToken, (req, res) => {
  res.status(200).json({ valid: true });
});

router.get("/auth/google", userController.GoogleAuth);

router.get("/auth/google/callback", userController.CallBackGoogleAuth);

module.exports = router;
