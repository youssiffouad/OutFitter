import styles from "../../styles/InputNewPieceStyle.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProtectedRoute from "../../helpers/HOCProtectionRoute";
import { useDispatch, useSelector } from "react-redux";
import {
  generateNewOutfit,
  setdisplayAddOutfitForm,
} from "../../reduxStore/OutfitSlice";
import { useEffect } from "react";
import { fetchWeatherConditions } from "../../reduxStore/weatherSlice";
import { fetchModes } from "../../reduxStore/modeSlice";
import { fetchOccasions } from "../../reduxStore/occasionSlice";

// Define your validation schema using Yup
const validationSchema = Yup.object({
  occasion: Yup.string().required("occasion is required"),
  dayornight: Yup.string().required("day Time is required"),
  weatherCondition: Yup.string().required("weather condition is required"),
  mode: Yup.string().required("Mode is required"),
});

const OutfitGeneratorForm = () => {
  const dispatch = useDispatch();
  const occasions = useSelector((state) => state.occasion);
  const weatherConditions = useSelector((state) => state.weather);
  const modes = useSelector((state) => state.mode);
  const display = useSelector((state) => state.outfit.displayAddOutfitForm);
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      occasion: "",
      dayornight: "",
      weatherCondition: "",
      mode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      dispatch(generateNewOutfit(values));
    },
  });

  useEffect(() => {
    dispatch(fetchWeatherConditions());
    dispatch(fetchModes());
    dispatch(fetchOccasions());
  }, []);

  return (
    display && (
      <ProtectedRoute>
        <div className="overlay">
          <div className={styles.formContainer}>
            <form onSubmit={formik.handleSubmit} className={styles.formStyle}>
              <h4 className="text-black mb-5 position-relative">
                Generate Outfit
              </h4>
              {/* Image upload */}

              {/* occasion selection */}
              <div>
                <select
                  id="occasion"
                  name="occasion"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.occasion}
                  className={`${
                    formik.touched.occasion && formik.errors.occasion
                      ? "border-danger"
                      : ""
                  }`}
                >
                  <option value="">Select a occasion</option>
                  {occasions.map((occasion) => (
                    <option key={occasion.id} value={occasion.id}>
                      {occasion.name}
                    </option>
                  ))}
                  {/* Add more options as needed */}
                </select>
                <label
                  htmlFor="occasion"
                  className={`${
                    formik.touched.occasion && formik.errors.occasion
                      ? "text-danger"
                      : ""
                  }`}
                >
                  Occasion
                </label>
                {formik.touched.occasion && formik.errors.occasion && (
                  <div className="text-danger">{formik.errors.occasion}</div>
                )}
              </div>

              {/* day or night selection */}
              <div>
                <select
                  id="dayornight"
                  name="dayornight"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dayornight}
                  className={`${
                    formik.touched.dayornight && formik.errors.dayornight
                      ? "border-danger"
                      : ""
                  }`}
                >
                  <option value="">Time of day</option>
                  <option value="morning">morning</option>
                  <option value="evening">evening</option>
                  <option value="night">night</option>
                  {/* Add more options as needed */}
                </select>
                <label
                  htmlFor="dayornight"
                  className={`${
                    formik.touched.dayornight && formik.errors.dayornight
                      ? "text-danger"
                      : ""
                  }`}
                >
                  Time of day
                </label>
                {formik.touched.dayornight && formik.errors.dayornight && (
                  <div className="text-danger">{formik.errors.dayornight}</div>
                )}
              </div>

              {/* weatherCondition field */}
              <div>
                <select
                  id="weatherCondition"
                  name="weatherCondition"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.weatherCondition}
                  className={`${
                    formik.touched.weatherCondition &&
                    formik.errors.weatherCondition
                      ? "border-danger"
                      : ""
                  }`}
                >
                  <option value="">Select Season</option>
                  {weatherConditions.map((condition) => (
                    <option key={condition.id} value={condition.id}>
                      {condition.name}
                    </option>
                  ))}
                  {/* Add more options as needed */}
                </select>
                <label
                  htmlFor="weatherCondition"
                  className={`${
                    formik.touched.weatherCondition &&
                    formik.errors.weatherCondition
                      ? "text-danger"
                      : ""
                  }`}
                >
                  Season
                </label>
                {formik.touched.weatherCondition &&
                  formik.errors.weatherCondition && (
                    <div className="text-danger">
                      {formik.errors.weatherCondition}
                    </div>
                  )}
              </div>

              {/* mode field */}
              <div>
                <select
                  id="mode"
                  name="mode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mode}
                  className={`${
                    formik.touched.mode && formik.errors.mode
                      ? "border-danger"
                      : ""
                  }`}
                >
                  <option value="">Select mode</option>
                  {modes.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                      {mode.name}
                    </option>
                  ))}
                  {/* Add more options as needed */}
                </select>
                <label
                  htmlFor="mode"
                  className={`${
                    formik.touched.mode && formik.errors.mode
                      ? "text-danger"
                      : ""
                  }`}
                >
                  mode
                </label>
                {formik.touched.mode && formik.errors.mode && (
                  <div className="text-danger">{formik.errors.mode}</div>
                )}
              </div>
              {/* Submit button */}
              <div className="d-flex justify-content-around m-0">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  className="bg-danger"
                  onClick={() => dispatch(setdisplayAddOutfitForm(false))}
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </ProtectedRoute>
    )
  );
};

export default OutfitGeneratorForm;
