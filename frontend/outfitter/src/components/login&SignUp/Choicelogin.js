import { useContext, useEffect } from "react";
import { AuthContext } from "../../ContextStore/authenticationStore";
import styles from "../../styles/InputNewPieceStyle.module.css"; // Import styles
import LoginForm from "./login";
import SignUpForm from "./signup";
import { createPortal } from "react-dom";
import usePopUp from "../../hooks/use_popup";
import { useDispatch, useSelector } from "react-redux";
import { setPopupTouched } from "../../reduxStore/userSlice";

const LoginChoice = () => {
  const popupMsg = useSelector((state) => state.user.popupMsg);
  const popupDisplay = useSelector((state) => state.user.popupDisplay);
  const popupTouched = useSelector((state) => state.user.popupTouched);
  const { signin } = useContext(AuthContext);
  const { Msgcomponent, controlMsgContent, controlDisplay } = usePopUp();
  const dispatch = useDispatch();

  useEffect(() => {
    controlMsgContent(popupMsg);
    controlDisplay(popupDisplay);
  }, [popupDisplay, popupMsg]);

  return (
    <div className={styles.formContainer}>
      {createPortal(Msgcomponent(), document.getElementById("popupPortal"))}
      {signin ? <LoginForm /> : <SignUpForm />}
    </div>
  );
};
export default LoginChoice;
