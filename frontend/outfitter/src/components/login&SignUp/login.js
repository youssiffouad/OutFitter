import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/InputNewPieceStyle.module.css"; // Import styles
import { AuthContext } from "../../ContextStore/authenticationStore";
import { useDispatch } from "react-redux";
import { login } from "../../reduxStore/userSlice";
import { useNavigate } from "react-router-dom";
import backport from "../../helpers/backendport";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleForm } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenInURI = params.get("token");
    if (tokenInURI) {
      const token = decodeURIComponent(tokenInURI);
      console.log("here is token in uri", token);
      localStorage.setItem("token", token);
      navigate("/home");
    }
  }, []);
  // Initialize Formik form using useFormik hook
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
      dispatch(login(values, navigate));
    },
  });

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.formContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.formStyle}>
        <h4 className="text-black mb-5">Login</h4>
        {/* Username input field */}
        <div className={styles.inputField}>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className={`form-control ${
              formik.touched.username && formik.errors.username
                ? "border-danger"
                : ""
            }`}
          />
          <label
            htmlFor="username"
            className={`${
              formik.touched.username && formik.errors.username
                ? "text-danger"
                : ""
            }`}
          >
            Username
          </label>
          {formik.touched.username && formik.errors.username && (
            <div className="text-danger">{formik.errors.username}</div>
          )}
        </div>
        {/* Password input field */}
        <div className={styles.inputField}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`form-control ${
              formik.touched.password && formik.errors.password
                ? "border-danger"
                : ""
            }`}
            style={{ position: "relative" }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              left: "88%",
              top: "22%",
              cursor: "pointer",
              background: "transparent",
              border: "none",
            }}
          >
            {/* Toggle icon */}
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
          <label
            htmlFor="password"
            className={`${
              formik.touched.password && formik.errors.password
                ? "text-danger"
                : ""
            }`}
          >
            Password
          </label>
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
        </div>
        {/* Submit button */}
        <div className="d-flex flex-row justify-content-around">
          <button
            type="submit"
            className={`btn btn-primary `} // Apply custom button style
            // disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
          <button
            className="  bg-body-secondary text-black w-35"
            onClick={toggleForm}
          >
            join Us
          </button>
          <button
            type="button"
            onClick={async () => {
              window.location.href = `http://localhost:${backport}/user/auth/google`;
            }}
          >
            Use Gmail
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
