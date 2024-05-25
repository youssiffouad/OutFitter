import { createContext, useState } from "react";
import backport from "../helpers/backendport";
export const MaterialContext = createContext({
  Materials: [],
  fetchAllMaterials: () => {},
});
export const MaterialProvider = (props) => {
  const [Materials, setMaterials] = useState([]);

  //fn to fetch all Material conditions
  const fetchAllMaterials = async () => {
    try {
      const response = await fetch(
        `http://localhost:${backport}/material/getMaterials`
      );
      const data = await response.json();
      console.log("here are the Materials  i received", data);
      setMaterials(data.materials);
    } catch (err) {
      console.log("failed to fetch Material ", err);
    }
  };
  return (
    <MaterialContext.Provider value={{ Materials, fetchAllMaterials }}>
      {props.children}
    </MaterialContext.Provider>
  );
};
