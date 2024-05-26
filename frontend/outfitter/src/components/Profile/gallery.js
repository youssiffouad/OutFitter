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
  }, [dispatch]);

  return (
    <div className={styles.gridContainer}>
      {clothes &&
        clothes.length > 0 &&
        clothes.map((item) => {
          const {
            id,
            photo = null,
            description = null,
            favourite = null,
            Material = {},
            WeatherCondition = {},
          } = item;

          // Check if Material and WeatherCondition are objects before accessing name
          const material = Material && Material.name ? Material.name : null;
          const cond =
            WeatherCondition && WeatherCondition.name
              ? WeatherCondition.name
              : null;

          return (
            <ClothesPhotoCard
              key={id}
              url={photo}
              description={description}
              photo={photo}
              favourite={favourite}
              id={id}
              material={material}
              cond={cond}
            />
          );
        })}
    </div>
  );
};

export default Gallery;
