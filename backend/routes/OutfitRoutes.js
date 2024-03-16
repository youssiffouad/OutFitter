const express = require("express");
const outfitController = require("../controllers/outfitController");
const TVMW = require("../middleware/tokenVerification");
const router = express.Router();
router.post("/generate", TVMW.verifyToken, outfitController.generateNewOutfit);
router.post(
  "/addToFavoutites",
  TVMW.verifyToken,
  outfitController.addToFavourites
);
router.delete("/delete", outfitController.deleteOutfit);
module.exports = router;
