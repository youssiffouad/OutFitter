const Mode = require("../models/Mode");
/*
 ***controller to fetch all Modes
 */
const fetchAllModes = async (req, res) => {
  try {
    const modes = await Mode.findAll();
    res.status(200).json({ message: "success fetching all modes", modes });
  } catch (err) {
    console.log("an error occured while getting all modes ", err);
    res.status(500).json(err);
  }
};
module.exports = { fetchAllModes };
