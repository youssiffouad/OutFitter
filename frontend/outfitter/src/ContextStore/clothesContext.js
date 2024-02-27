import { useSelector } from "react-redux";
import backport from "../helpers/backendport";
const { createContext, useState } = require("react");

export const ClothesContext = createContext({
  Clothes: [],
  fetchAllClothes: () => {},
});
export const ClothesCtxProvider = (props) => {
  const userid = useSelector((state) => state.user.user);

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
      `http://localhost:${backport}/user/${userid}/fetchAllClothes`
    );
    const data = await response.json();
    console.log("here is the data of fetching all clothes", data);
    data.forEach((element) => {
      const url = URL.createObjectURL(element.img);
      const imgelement = { url }; //rest of img sttributes are added to this object
      setClothes((prev) => [...prev, { imgelement }]);
    });
  };
  return (
    <ClothesContext.Provider value={{ fetchAllClothes, Clothes }}>
      {props.children}
    </ClothesContext.Provider>
  );
};
