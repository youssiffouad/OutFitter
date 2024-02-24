import { useContext } from "react";
import { ProfileContext } from "../../ContextStore/profileContext";
import styles from "../../styles/profile.module.css";

const MyProfile = () => {
  const { photoURL, handleFileChange, handleUpload, getProfilePhoto } =
    useContext(ProfileContext);

  return (
    <div className="container-lg bg-dark " style={{ height: "100vh" }}>
      <div className=" rounded-4 h-50 bg-info w-100 d-flex justify-content-center align-content-end flex-wrap">
        <div
          className="rounded-4 bg-light d-flex justify-content-center align-content-end position-relative "
          style={{ height: "150px", width: " 150px" }}
        >
          <img src={photoURL} alt="eeeeeeeee" />
          <div className={` position-absolute`}>
            {/* <input type="file" name="photo" onChange={handleFileChange} /> */}
            <input type="file" id="fileInput" style={{ display: "none" }} />
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

      {/* <button
        className="btn btn-dark w-50"
        style={{ height: "fit-content" }}
        type="submit"
        onClick={handleUpload}
      >
        Upload new photo
      </button> */}
    </div>
  );
};
export default MyProfile;
