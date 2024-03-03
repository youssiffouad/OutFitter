const weatherServices = require("../Services/weatherServices");

//fn to get all weather conditions
const fetchWeatherConditions = async (req, res) => {
  try {
    const conditions = await weatherServices.fetchAllWeatherConsitions();
    res.status(200).json({ conditions });
  } catch (err) {
    console.log("failed to fetch weather conditions", err);
    res.status(500).json({ error: err });
  }
};

module.exports = { fetchWeatherConditions };
