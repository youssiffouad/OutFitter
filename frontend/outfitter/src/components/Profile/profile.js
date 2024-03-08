import { useContext, useEffect } from "react";
import { ProfileContext } from "../../ContextStore/profileContext";
import styles from "../../styles/profile.module.css";
import Gallery from "./gallery";
import NewClothesPiece from "./addNewPiece";
import { createPortal } from "react-dom";
import usePopUp from "../../hooks/use_popup";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { photoURL, handleFileChange } = useContext(ProfileContext);
  const popupMsgText = useSelector((state) => state.clothes.popupMsgText);
  const popupDisplay = useSelector((state) => state.clothes.popupDisplay);

  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();
  useEffect(() => {
    console.log("from useeffect here is the msg component", Msgcomponent);
    console.log("from useeffect here is the msg text", popupMsgText);
    controlDisplay(popupDisplay);
    controlMsgContent(popupMsgText);
  }, [
    popupMsgText,
    Msgcomponent,
    controlDisplay,
    controlMsgContent,
    popupDisplay,
  ]);
  return (
    <div
      className="container-xl bg-dark "
      style={{ height: "calc(100vh - 60px) " }}
    >
      {createPortal(Msgcomponent(), document.getElementById("popupPortal"))}
      <div className=" rounded-4 h-50 bg-info w-100 d-flex justify-content-center align-content-end flex-wrap">
        <div
          className={` ${styles.profilePhotoContainer} rounded-4 bg-light d-flex justify-content-center align-content-end position-relative  `}
          style={{ height: "150px", width: " 150px" }}
        >
          <img src={photoURL} alt="eeeeeeeee" />
          <div className={` position-absolute ${styles.btnContainer}`}>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label
              for="fileInput"
              id="fileInputLabel"
              className={`${styles.InputLabel}`}
            >
              Upload New Photo
            </label>
          </div>
        </div>
      </div>
      <NewClothesPiece />
      <Gallery />
    </div>
  );
};
export default MyProfile;
