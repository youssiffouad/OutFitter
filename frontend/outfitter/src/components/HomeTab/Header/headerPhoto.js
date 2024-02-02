import styles from "../../../styles/headerPhoto.module.css";

const HeaderPhoto = () => {
  return (
    <div className={styles.headerPhoto}>
      <div className={styles.overlay}></div>
      <h1>
        Match
        <br />
        Your
        <br />
        Styling
      </h1>
    </div>
  );
};
export default HeaderPhoto;
