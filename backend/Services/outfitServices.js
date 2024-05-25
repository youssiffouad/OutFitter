const Outfit = require("../models/Outfit");
const OutfitClothes = require("../models/OutfitClothes");
const sequelize = require("../models/sequelizeInstance");
const User = require("../models/User");
const Mode = require("../models/Mode");
const Occasion = require("../models/OccasionTypes");

const WeatherCondition = require("../models/weatherCondition");
const Clothes = require("../models/Clothes");
/*
 *** function to add new outfit
 *** args: array of integers representing clothes ids and params { mode, weather, occasion, daytime }
 *** should create a new record in the Outfit table and
 *** associate it with its constituent clothes in the OUTFIT_CLOTHES table
 */
const addNewOutfit = async (clotheIds, params) => {
  console.log(" I WILL START CREAATIONNNNNNNNNNN of adding new outfit");
  const transaction = await sequelize.transaction();
  try {
    const { mode, weatherCondition, occasion, dayornight, userid } = params;
    const payload = {
      mode_id: mode,
      weather_id: weatherCondition,
      occasion_id: occasion,
      dayTime: dayornight,
      user_id: userid,
    };
    console.log(
      "here is the pay;pad i received------------------------>>>>>>>>>>>........",
      payload
    );

    // Create the outfit
    const outfitCreated = await Outfit.create(payload, {
      transaction,
    });
    //associate hte outfit with its clothes(insert records into many to many table of outfit clothes)
    for (let i = 0; i < clotheIds.length; i++) {
      console.log(clotheIds[i], outfitCreated.id);
      await OutfitClothes.create(
        { OutfitId: outfitCreated.id, ClotheId: clotheIds[i] },
        { transaction }
      );
    }

    const outfitWithAssociations = await Outfit.findByPk(outfitCreated.id, {
      include: [
        { model: WeatherCondition },
        { model: Mode },
        { model: Occasion },
        { model: User },
        { model: Clothes },
      ],
      transaction,
    });
    console.log(
      "here is the outfit created------------------------->>>>>>>>>>>>>>>>",
      outfitWithAssociations
    );
    console.log(
      "here are the clothes-------------------------->>>>>>>>.........................<<<<<<<<<<----------------",
      outfitWithAssociations.Clothes
    );
    await transaction.commit();
    return outfitWithAssociations;
  } catch (err) {
    transaction.rollback();
    console.log("an error occured while adding new outfit", err);
  }
};

/*
 *** description ---> fn to add certian outfit to favourites or emove it (toggle favourite)
 */
const AddToFavourites = async (id) => {
  try {
    const outfitItem = await Outfit.findByPk(id);
    let isFav = outfitItem.get("favourite");
    console.log("here is the current favourite state", isFav);
    if (isFav === null) isFav = false;
    await outfitItem.update({ favourite: !isFav });
    const msg = isFav
      ? "success removing item from favourites"
      : "success adding item to favourites";
    return msg;
  } catch (err) {
    console.log("failed to add to FFFAAAAAAvs");
    throw err;
  }
};

/*
 *** description -----> fn to delete certain outfit
 ***                    it will remove the record from from the Fb but keep its clothes
 *** args ---> id of the outfit
 */
const deleteOutfit = async (id) => {
  try {
    const outfitItem = await Outfit.findByPk(id);
    await outfitItem.destroy();
  } catch (err) {
    console.log("failed to delete outfit item", err);
    throw err;
  }
};
module.exports = { addNewOutfit, AddToFavourites, deleteOutfit };
