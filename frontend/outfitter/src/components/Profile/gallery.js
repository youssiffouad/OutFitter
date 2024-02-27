import ClothesPhotoCard from "./ClothesPhotoCards";
import styles from "../../styles/ClothesPhotoCards.module.css";
const Gallery = () => {
  const arr = new Array(12);
  console.log("her is te ele", arr.length);
  return (
    <div className={styles.gridContainer}>
      <ClothesPhotoCard />
      <ClothesPhotoCard />

      <ClothesPhotoCard />

      <ClothesPhotoCard />
      <ClothesPhotoCard />
      <ClothesPhotoCard />

      <ClothesPhotoCard />
    </div>
  );
};
export default Gallery;
