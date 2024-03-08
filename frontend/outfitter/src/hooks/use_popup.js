import { useState } from "react";
import "../styles/pop-up.css";
import { useDispatch } from "react-redux";
import { setPopupDisplay } from "../reduxStore/ClothesSlice";

const usePopUp = () => {
  const [display, setdisplay] = useState(false);
  const [msgContent, setmsgContent] = useState("");
  const [formJSX, setformJSX] = useState(null);

  const dispatch = useDispatch();
  const controlDisplay = (arg) => {
    console.log("i set the display to ", arg);
    setdisplay(arg);
  };
  const controlMsgContent = (msg) => {
    console.log("i set the msg content to", msg);
    setmsgContent(msg);
  };
  const controlFormJSX = (arg) => {
    console.log("here is the form i received", arg);
    setformJSX(arg);
  };
  const Msgcomponent = () => {
    console.log("w b3deeeeeeeeeeeeeneeeeeeee");
    console.log(display);
    console.log(msgContent);
    return (
      <>
        {display && (
          <div className="overlay">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <h1>{msgContent}</h1>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => {
                      dispatch(setPopupDisplay(false));
                      setdisplay(false);
                    }}
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  const FormContent = () => <>{formJSX}</>;
  return {
    Msgcomponent,
    controlDisplay,
    controlMsgContent,
    FormContent,
    controlFormJSX,
  };
};
export default usePopUp;
