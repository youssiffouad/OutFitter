const MaterialServices = require("../Services/materialServices");

//fn to get all weather conditions
const fetchMaterials = async (req, res) => {
  try {
    const materials = await MaterialServices.fetchAllMaterials();
    res.status(200).json({ materials });
  } catch (err) {
    console.log("failed to fetch materials", err);
    res.status(500).json({ error: err });
  }
};

module.exports = { fetchMaterials };
