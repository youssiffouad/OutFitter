import styles from "../../styles/InputNewPieceStyle.module.css";

import { useFormik } from "formik";

import * as Yup from "yup";

import ProtectedRoute from "../../helpers/HOCProtectionRoute";

import { useDispatch, useSelector } from "react-redux";

import {
  addNewClothesPiece,
  setSelectedClothesPiece,
  setdisplayAddPiecceForm,
} from "../../reduxStore/ClothesSlice";

import { fetchMaterials } from "../../reduxStore/materialSlice";

import { fetchModes } from "../../reduxStore/modeSlice";

import { fetchWeatherConditions } from "../../reduxStore/weatherSlice";

import { useEffect } from "react";

// Define your validation schema using Yup

const validationSchema = Yup.object({
  image: Yup.mixed().required("Image is required"),
  mode: Yup.string().required("mood is required"),
  category: Yup.string().required("day time is required"),

  weatherCondition: Yup.string().required("season is required"),

  material: Yup.string().required("occasion is required"),
});

const InputNewPieceForm = () => {
  const dispatch = useDispatch();
  const weatherConditions = useSelector((state) => state.weather);
  const modes = useSelector((state) => state.mode);

  const selectedClothesPiece = useSelector(
    (state) => state.clothes.selectedClothesPiece
  );
  const materials = useSelector((state) => state.material);
  const display = useSelector((state) => state.clothes.displayAddPiecceForm);

  const formik = useFormik({
    initialValues: {
      weatherCondition: "",
      material: "",
      category: "",
      mode: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formdata = new FormData();
      formdata.append("clothesimg", formik.values.image);
      formdata.append("category", formik.values.category);
      formdata.append("mode", formik.values.mode);
      formdata.append("material", formik.values.material);
      formdata.append("weatherCondition", formik.values.weatherCondition);
      dispatch(addNewClothesPiece(formdata));
      console.log(values);
    },
  });

  useEffect(() => {
    dispatch(fetchMaterials());
    dispatch(fetchWeatherConditions());
    dispatch(fetchModes());
  }, []);

  return (
    display && (
      <ProtectedRoute>
        <div className="overlay">
          <div className={styles.formContainer}>
            <form onSubmit={formik.handleSubmit} className={styles.formStyle}>
              <h4 className="text-black mb-5 position-relative">
                Insert new Piece
              </h4>
              {/* Image upload */}
              <div style={{ display: "flex", justifyContent: "flexstart" }}>
                <label
                  htmlFor="image"
                  style={{
                    left: "0px",
                    top: "-5px",
                    width: "fit-content",
                    borderRadius: "5px",
                    cursor: "pointer",
                    position: "relative",
                    backgroundColor: "#494949",
                    padding: "5px",
                    color: "#d9d9d9",
                  }}
                >
                  Upload Image
                </label>
                {<p>{selectedClothesPiece}</p>}
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="image"
                  name="image"
                  onChange={(event) => {
                    console.log("curr target", event.currentTarget);
                    console.log(" target", event.target.files[0].name);
                    formik.setFieldValue("image", event.target.files[0]);
                    dispatch(
                      setSelectedClothesPiece(event.target.files[0].name)
                    );
                    // handlePieceSelection(event.target.files[0].name);
                  }}
                />
                {formik.touched.image && formik.errors.image && (
                  <div className="text-danger">{formik.errors.image}</div>
                )}
              </div>

              {/* Category selection */}
              <div>
                <select
                  id="category"
                  name="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                  className={`${
                    formik.touched.category && formik.errors.category
                      ? "border-danger"
                      : ""
                  }`}
                >
                  <option value="">Select day time</option>

                  <option value="category1">morning </option>

                  <option value="category2">evening </option>

                  <option value="category2">night </option>
                  {/* Add more options as needed */}
                </select>
                <label
                  htmlFor="category"
                  className={`${
                    formik.touched.category && formik.errors.category
                      ? "text-danger"
                      : ""
                  }`}
                >
                  day time
                </label>
                {formik.touched.category && formik.errors.category && (
                  <div className="text-danger">{formik.errors.category}</div>
                )}
              </div>

              {/* Material selection */}
              <div>
                <select
                  id="material"
                  name="material"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.material}
                  className={`${
                    formik.touched.material && formik.errors.material
                      ? "border-danger"
                      : ""
                  }`}
                >
                  <option value="">select a occasion</option>
                  {materials.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="material"
                  className={`${
                    formik.touched.material && formik.errors.material
                      ? "text-danger"
                      : ""
                  }`}
                >
                  occasion
                </label>
                {formik.touched.material && formik.errors.material && (
                  <div className="text-danger">{formik.errors.material}</div>
                )}
              </div>

              {/* WeatherCondition selection */}
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
                  <option value="">Select a season</option>
                  {weatherConditions.map((cond) => (
                    <option value={cond.id} key={cond.id}>
                      {cond.name}
                    </option>
                  ))}
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
                  season
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
                  <option value="">Select mood</option>

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
                  mood
                </label>

                {formik.touched.mode && formik.errors.mode && (
                  <div className="text-danger">{formik.errors.mode}</div>
                )}
              </div>

              {/* Submit button */}
              <div className="d-flex justify-content-around">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  className="bg-danger"
                  onClick={() => dispatch(setdisplayAddPiecceForm(false))}
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

export default InputNewPieceForm;
