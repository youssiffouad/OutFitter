const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");
router.get("/getCondtions", weatherController.fetchWeatherConditions);
module.exports = router;
