import { useSelector } from "react-redux";
import backport from "../helpers/backendport";
const { createContext, useState } = require("react");

export const ClothesContext = createContext({
  Clothes: [],
  fetchAllClothes: () => {},
  selectedPiecePhoto: "",
  handlePieceSelection: () => {},
});
export const ClothesCtxProvider = (props) => {
  const userid = useSelector((state) => state.user.user);
  const [selectedPiecePhoto, setselectedPiecePhoto] = useState("");
  const handlePieceSelection = (piece) => {
    setselectedPiecePhoto(piece);
  };

  //const [ClothesBlobs, setClothesBlobs] = useState([]);
  const [Clothes, setClothes] = useState([]);

  //fn to fetch certain clothes piece
  const fetchCertainPiece = async (pieceId) => {
    const response = await fetch(
      `http://localhost:${backport}/user/${userid}/fetchPiece/${pieceId}`
    );
    const data = await response.json();
  };

  //fn to fetch all clothes of certain user
  const fetchAllClothes = async () => {
    const response = await fetch(
      `http://localhost:${backport}/user/fetchAllClothes`
    );
    const data = await response.json();
    console.log("here is the data of fetching all clothes", data);
    data.forEach((element) => {
      const url = URL.createObjectURL(element.img);
      const imgelement = { url }; //rest of img sttributes are added to this object
      setClothes((prev) => [...prev, { imgelement }]);
    });
  };

  //fn to add new clothes piece
  const AddNewClothesPiece = async (formdata) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:${backport}/user/addNewClothesPiece`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            phototype: "ClothesPhoto",
          },
          body: formdata,
        }
      );
      const data = await response.json();
      console.log(
        "here is the response i received for adding new clothes piece",
        data
      );
    } catch (err) {
      console.log("an error occured while adding new clothes piece ", err);
    }
  };
  return (
    <ClothesContext.Provider
      value={{
        fetchAllClothes,
        Clothes,
        selectedPiecePhoto,
        handlePieceSelection,
      }}
    >
      {props.children}
    </ClothesContext.Provider>
  );
};
