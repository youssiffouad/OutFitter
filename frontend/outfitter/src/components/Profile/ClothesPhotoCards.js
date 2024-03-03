import styles from "../../styles/ClothesPhotoCards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

import {
  addToFavourites,
  deleteClothesItem,
} from "../../reduxStore/ClothesSlice";
import { useDispatch } from "react-redux";

const ClothesPhotoCard = (props) => {
  const dispatch = useDispatch();
  return (
    <div className={` ${styles.Card}`}>
      <div className={styles.ImgContainer}>
        <img src={`data:image/png;base64,${props.photo}`} alt="clothes img" />

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
      </div>
      <div className={styles.ImgAtts}>
        <h6>{props.description}</h6>
        <p>
          made of <strong>{props.material}</strong>
        </p>
        <p>
          suitable for <strong>{props.cond}</strong> conditions
        </p>
      </div>
      <div className={styles.trashContainer}>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => dispatch(deleteClothesItem(props.id))}
        />
      </div>
    </div>
  );
};

export default ClothesPhotoCard;
