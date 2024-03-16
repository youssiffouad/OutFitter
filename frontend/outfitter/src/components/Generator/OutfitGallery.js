import { useEffect } from "react";
import styles from "../../styles/OutfitGallery.module.css";
import OutfitCard from "./OutfitCard";
import { fetchAllOutfits } from "../../reduxStore/OutfitSlice";
import { useDispatch, useSelector } from "react-redux";
const OutfitGallery = () => {
  let outfits = useSelector((state) => state.outfit.outfits);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOutfits());
  }, []);
  return (
    <div className={styles.OutfitgridContainer}>
      {outfits.map((outfit) => (
        <OutfitCard
          key={outfit.id}
          id={outfit.id}
          favourite={outfit.favourite}
          clothes={outfit.Clothes}
          mode={outfit.Mode}
          occasion={outfit.OccasionType}
          weathercondition={outfit.WeatherCondition}
        />
      ))}
    </div>
  );
};
export default OutfitGallery;
