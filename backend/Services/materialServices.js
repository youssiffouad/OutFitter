const Material = require("../models/Material");

//fn to fetch all existing weather materials
const fetchAllMaterials = async () => {
  try {
    const materials = await Material.findAll();
    return materials;
  } catch (err) {
    console.log("failed to get  materials", err);
    throw err;
  }
};

module.exports = { fetchAllMaterials };
