import { useContext } from "react";
import { AuthContext } from "../../ContextStore/authenticationStore";
import styles from "../../styles/InputNewPieceStyle.module.css"; // Import styles
import LoginForm from "./login";
import SignUpForm from "./signup";

const LoginChoice = () => {
  const { signin } = useContext(AuthContext);

  return (
    <div className={styles.formContainer}>
      {signin ? <LoginForm /> : <SignUpForm />}
    </div>
  );
};
export default LoginChoice;
