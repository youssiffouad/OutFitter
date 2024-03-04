import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import usePopUp from "../../hooks/use_popup";
import InputNewPieceForm from "./FormInputNewPiece";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { setdispalyForm } from "../../reduxStore/ClothesSlice";
const NewClothesPiece = () => {
  const { FormContent, controlFormJSX } = usePopUp();
  const dispatch = useDispatch();
  const payloadform = <InputNewPieceForm />;
  const handleADD = () => {
    dispatch(setdispalyForm(true));
    controlFormJSX(payloadform);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      {createPortal(<FormContent />, document.getElementById("popupPortal"))}
      <button
        className="btn btn-secondary d-flex align-items-center"
        onClick={handleADD}
      >
        add new Clothes Item{" "}
        <FontAwesomeIcon
          icon={faAdd}
          style={{
            backgroundColor: "#125c6b",
            padding: "4px",
            borderRadius: "2px",
            marginLeft: "5px",
          }}
        />
      </button>
    </div>
  );
};
export default NewClothesPiece;
