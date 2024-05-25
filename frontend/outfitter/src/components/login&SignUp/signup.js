import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/InputNewPieceStyle.module.css"; // Import styles
import { useDispatch } from "react-redux";
import { signUp } from "../../reduxStore/userSlice";
import { AuthContext } from "../../ContextStore/authenticationStore";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpForm = () => {
  const { toggleForm } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const dispatch = useDispatch();
  // Initialize Formik form using useFormik hook
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("here is the response");
      // Handle form submission logic here
      dispatch(signUp(values));
      console.log(values);
    },
  });

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.formStyle}>
        <h4 className="text-black mb-5">Sign Up</h4>
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
        {/* Confirm Password input field */}
        <div className={styles.inputField}>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className={`form-control ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
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
            htmlFor="confirmPassword"
            className={`${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "text-danger"
                : ""
            }`}
          >
            Confirm Password
          </label>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-danger">{formik.errors.confirmPassword}</div>
          )}
        </div>
        {/* Submit button */}
        <div className="d-flex flex-row justify-content-between align-items-center">
          <button
            type="submit"
            className={`btn btn-primary `} // Apply custom button style
            // disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
          <button
            className="  bg-body-secondary text-black w-50"
            onClick={toggleForm}
          >
            already have an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
