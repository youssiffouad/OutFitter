import styles from "../../styles/OutfitGallery.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addToFavourites, deleteOutfit } from "../../reduxStore/OutfitSlice";
const OutfitCard = (props) => {
  const dispatch = useDispatch();
  console.log(props.id);
  return (
    <div className={` ${styles.OutfitCard}`}>
      {props.clothes.map((clothPiece) => (
        <div key={clothPiece.id} className={styles.OutfitImgContainer}>
          <img
            src={`data:image/png;base64,${clothPiece.photo}`}
            alt="outfit img"
          />
        </div>
      ))}

      <div className={styles.favIcon}>
        <FontAwesomeIcon
          onClick={() => dispatch(addToFavourites(props.id))}
          icon={faHeart}
          style={{
            color: `${props.favourite ? "red" : "white"}`,
            width: "20px",
            height: "20px",
          }}
        />
      </div>
      <div className={styles.trashContainer}>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => dispatch(deleteOutfit(props.id))}
        />
      </div>
    </div>
  );
};
export default OutfitCard;
