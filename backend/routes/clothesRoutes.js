const express = require("express");
const clothesController = require("../controllers/clothesController");
const router = express.Router();

const TVMW = require("../middleware/tokenVerification");

router.post(
  "/addTofavourites",
  TVMW.verifyToken,
  clothesController.addTofavourites
);
router.post(
  "/deleteClothesItem",
  TVMW.verifyToken,
  clothesController.deleteClothesItem
);
module.exports = router;
