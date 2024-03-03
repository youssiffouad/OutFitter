const express = require("express");
const router = express.Router();
const MaterialController = require("../controllers/materialController");
router.get("/getMaterials", MaterialController.fetchMaterials);
module.exports = router;
