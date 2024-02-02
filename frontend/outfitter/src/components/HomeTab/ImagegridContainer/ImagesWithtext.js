import PhotoArray from "./photoArray";
import styles from "../../../styles/GridWithTet.module.css"; // Import the CSS module

const GridWithText = () => {
  return (
    <div className={styles.container}>
      <div className={styles.photoGrid}>
        {PhotoArray.map((photo, index) => (
          <div key={index} className={styles.photoContainer}>
            {" "}
            <img src={photo} className={styles.photo} />
          </div>
        ))}
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>INPUT</h2>
        <h2 className={styles.title}>ASK</h2>
        <h2 className={styles.title}>GENERATE</h2>
        <p className={styles.description}>AI powered suggestions</p>
      </div>
    </div>
  );
};

export default GridWithText;
