import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import backendport from "../helpers/backendport";

export const ProfileContext = createContext({
  selectedProfilePhoto: "",
  photoURL: "",
  photoBlob: "",
  getProfilePhoto: () => {},
  handleFileChange: (event) => {},
  handleUpload: () => {},
});

export const ProfileProvider = ({ children }) => {
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [photoBlob, setphotoBlob] = useState(null);
  const [photofetched, setphotofetched] = useState(false);
  const userid = useSelector((state) => state.user.user);

  const getProfilePhoto = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:${backendport}/user/getprofilephoto`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        }
      );
      const photoBLOB = await response.blob();
      setphotoBlob(photoBLOB);
    } catch (err) {
      console.log("error while getting profile photo", err);
    }
  };

  const handleUpload = async () => {
    if (!selectedProfilePhoto) {
      alert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("photo", selectedProfilePhoto);
    console.log("here is the form data", formData);
    console.log("here is the selected file", selectedProfilePhoto);

    try {
      const token = localStorage.getItem("token");
      console.log("here is the from data st client", formData.phototype);
      const response = await fetch(
        `http://localhost:${backendport}/user/uploadprofilephoto`,
        {
          method: "POST",
          body: formData,
          headers: { authorization: token, phototype: "profilephotos" },
        }
      );
      if (!response.ok) {
        throw new Error("Upload failed");
      }

      // Handle successful upload, e.g., display a success message
      console.log("Upload successful");
      await getProfilePhoto();
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle upload error, e.g., display an error message
      alert("Error uploading file");
    }
  };
  useEffect(() => {
    if (photofetched) handleUpload();
  }, [selectedProfilePhoto]);

  useEffect(() => {
    if (!photofetched) {
      getProfilePhoto();
    }
    setphotofetched(true);
    if (photoBlob) {
      try {
        const url = URL.createObjectURL(photoBlob);
        setPhotoURL(url);
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    }
  }, [photoBlob]);

  const handleFileChange = async (event) => {
    setSelectedProfilePhoto(event.target.files[0]);
  };

  return (
    <ProfileContext.Provider
      value={{
        selectedProfilePhoto,
        photoURL,
        photoBlob,
        getProfilePhoto,
        handleFileChange,
        handleUpload,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
