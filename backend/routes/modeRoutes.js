const express = require("express");
const ModeController = require("../controllers/ModesController");
const router = express.Router();
router.get("/fetchModes", ModeController.fetchAllModes);
module.exports = router;
