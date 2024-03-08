const express = require("express");
const OccasionController = require("../controllers/OccasionController");
const router = express.Router();
router.get("/fetchOccasions", OccasionController.fetchAllOccasions);
module.exports = router;
