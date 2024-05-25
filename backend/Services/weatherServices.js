const WeatherConditions = require("../models/weatherCondition");

//fn to fetch all existing weather conditions
const fetchAllWeatherConsitions = async () => {
  try {
    const conditions = await WeatherConditions.findAll();
    return conditions;
  } catch (err) {
    console.log("failed to get weahter conditions", err);
    throw err;
  }
};

module.exports = { fetchAllWeatherConsitions };
