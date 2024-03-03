const Material = require("../models/Material");
const WeatherCondition = require("../models/weatherCondition");
// Create three records inside the Material table
const createMaterials = async () => {
  try {
    await Material.bulkCreate([
      { name: "cotton" },
      { name: "wool" },
      { name: "polyester" },
    ]);
    console.log("Successfully created records in the Material table");
  } catch (error) {
    console.error("Failed to create records:", error);
  }
};
const createWeatherConditions = async () => {
  try {
    WeatherCondition.bulkCreate([
      { name: "sunny" },
      { name: "cold" },
      { name: "rainy" },
      { name: "windy" },
      { name: "snowy" },
      { name: "moderate" },
    ]);
    console.log("successfully created rows inside Weather condition table");
  } catch (err) {
    console.log("failed to insert records into weather Condition table", err);
  }
};

//create records of weather
// WeatherCondition.sync()
//   .then(async () => {
//     console.log(await WeatherCondition.findAll());
//   })
//   .catch((err) => console.log(":failed in weather condition creation"));

// // Sync the model and then create the records
// Material.sync()
//   .then(() => {
//     console.log("Successfully created the Material table");
//     return createMaterials(); // Call createMaterials after syncing
//   })
//   .catch((err) => console.error("Failed to create the Material table:", err));

// module.exports = Material;
