import styles from "../../styles/ClothesPhotoCards.module.css";
const ClothesPhotoCard = () => {
  return (
    <div className={` ${styles.Card}`}>
      <div className={styles.ImgContainer}>
        <div className={styles.favIcon}></div>
      </div>
      <div className={styles.ImgAtts}>
        <h2>description</h2>
        <p>lorem and some random tesxt bla bla bla</p>
        <p>amother random text</p>
      </div>
    </div>
  );
};

export default ClothesPhotoCard;
