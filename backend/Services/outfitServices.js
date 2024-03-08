const Outfit = require("../models/Outfit");
const OutfitClothes = require("../models/OutfitClothes");
const sequelize = require("../models/sequelizeInstance");
/*
 *** function to add new outfit
 *** args: array of integers representing clothes ids and params { mode, weather, occasion, daytime }
 *** should create a new record in the Outfit table and
 *** associate it with its constituent clothes in the OUTFIT_CLOTHES table
 */
const addNewOutfit = async (clotheIds, params) => {
  const transaction = sequelize.transaction();
  try {
    const { mode, weather, occasion, daytime } = params;
    const payload = {
      mode_id: mode,
      weather_id: weather,
      occasion_id: occasion,
      dayTime: daytime,
    };

    const outfitCreated = await Outfit.create(payload, { transaction });
    for (const id of clotheIds) {
      await OutfitClothes.create(
        { OutfitId: outfitCreated.id, ClotheId: id },
        { transaction }
      );
    }
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.log("an error occured while adding new outfit", err);
  }
};
module.exports = { addNewOutfit };
