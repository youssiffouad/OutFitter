import { useState } from "react";
import "../styles/pop-up.css";

const usePopUp = () => {
  const [display, setdisplay] = useState(false);
  const [msgContent, setmsgContent] = useState("");
  const [formJSX, setformJSX] = useState(null);
  const controlDisplay = (arg) => {
    setdisplay(arg);
  };
  const controlMsgContent = (msg) => {
    setmsgContent(msg);
  };
  const controlFormJSX = (arg) => {
    console.log("here is the form i received", arg);
    setformJSX(arg);
  };
  const Msgcomponent = () => (
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
