const Occasions = require("../models/OccasionTypes");
/*
 ***controller to fetch all occasions
 */
const fetchAllOccasions = async (req, res) => {
  try {
    const occasions = await Occasions.findAll();
    res.status(200).json({ message: "success fetching occasions", occasions });
  } catch (err) {
    console.log("an error occured while fetching occasions", err);
    res.status(500).json(err);
  }
};
module.exports = { fetchAllOccasions };
