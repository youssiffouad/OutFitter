import ClothesPhotoCard from "./ClothesPhotoCards";
import styles from "../../styles/ClothesPhotoCards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClothes } from "../../reduxStore/ClothesSlice";
import { useEffect } from "react";
const Gallery = () => {
  const clothes = useSelector((state) => state.clothes.clothesItems);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllClothes());
  }, []);
  return (
    <div className={styles.gridContainer}>
      {clothes.length > 0 &&
        clothes.map((item) => (
          <ClothesPhotoCard
            key={item.id}
            url={item.photo}
            description={item.description}
            photo={item.photo}
            favourite={item.favourite}
            id={item.id}
            material={item.Material.name}
            cond={item.WeatherCondition.name}
          />
        ))}
    </div>
  );
};
export default Gallery;
