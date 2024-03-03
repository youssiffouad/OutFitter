const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const photoUpload = require("../middleware/profilePhotoHandler");
const TVMW = require("../middleware/tokenVerification");

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
module.exports = router;
