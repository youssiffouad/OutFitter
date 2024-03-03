import { useSelector } from "react-redux";
import backport from "../helpers/backendport";
import { WeatherContext } from "./weatherContext";
import { MaterialContext } from "./materialContext";
const { createContext, useState, useContext, useEffect } = require("react");

export const ClothesContext = createContext({
  weatherConditions: [],
  Materials: [],
  Clothes: [],
  fetchAllWeahterConditions: () => {},
  fetchAllMaterials: () => {},
  fetchAllClothes: () => {},
  selectedClothesPiece: "",
  handlePieceSelection: (piece) => {},
  AddNewClothesPiece: (formdata) => {},
});
export const ClothesCtxProvider = (props) => {
  const userid = useSelector((state) => state.user.user); //userid to get clothes of certain user

  //select certain weather conditions and materials on adding new clothes
  const { weatherConditions, fetchAllWeahterConditions } =
    useContext(WeatherContext);
  const { Materials, fetchAllMaterials } = useContext(MaterialContext);

  //the image file u chose to upload
  const [selectedClothesPiece, setselectedClothesPiece] =
    useState("no file chosen");
  const handlePieceSelection = (piece) => {
    console.log("i chamged clothes piece file", piece);
    setselectedClothesPiece(piece);
  };

  //const [ClothesBlobs, setClothesBlobs] = useState([]);
  const [Clothes, setClothes] = useState([]);

  //fetch weather conditions and materials on loading page
  useEffect(() => {
    fetchAllWeahterConditions();
    fetchAllMaterials();
  }, []);

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
    console.log("here is the form data", formdata);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:${backport}/user/addNewClothesPiece`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
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
        selectedClothesPiece,
        handlePieceSelection,
        AddNewClothesPiece,
        weatherConditions,
        Materials,
      }}
    >
      {props.children}
    </ClothesContext.Provider>
  );
};
