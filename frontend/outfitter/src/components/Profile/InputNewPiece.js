import styles from "../../styles/InputNewPieceStyle.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProtectedRoute from "../../helpers/HOCProtectionRoute";

// Define your validation schema using Yup
const validationSchema = Yup.object({
  image: Yup.mixed().required("Image is required"),
  category: Yup.string().required("Category is required"),
  weatherCondition: Yup.string().required("weatherCondition is required"),
  material: Yup.string().required("material is required"),
  description: Yup.string().required("Description is required"),
});

const InputNewPieceForm = () => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      weatherCondition: "",
      material: "",
      description: "",
      category: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

  return (
    <ProtectedRoute>
      <div className={styles.formContainer}>
        <form onSubmit={formik.handleSubmit} className={styles.formStyle}>
          <h4 className="text-black mb-5 position-relative">
            Insert new Piece
          </h4>
          {/* Image upload */}
          <div>
            <label
              htmlFor="image"
              style={{
                left: "0px",
                width: "fitContent",
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
            <p>{}</p>
            <input
              style={{ display: "none" }}
              type="file"
              id="image"
              name="image"
              onChange={(event) =>
                formik.setFieldValue("image", event.currentTarget.n)
              }
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
              <option value="">Select a category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
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
              Category
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
              <option value="">Select a material</option>
              <option value="material1">Material 1</option>
              <option value="material2">Material 2</option>
              {/* Add more options as needed */}
            </select>
            <label
              htmlFor="material"
              className={`${
                formik.touched.material && formik.errors.material
                  ? "text-danger"
                  : ""
              }`}
            >
              Material
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
              <option value="">Select a weather condition</option>
              <option value="weatherCondition1">Weather Condition 1</option>
              <option value="weatherCondition2">Weather Condition 2</option>
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
              Weather Condition
            </label>
            {formik.touched.weatherCondition &&
              formik.errors.weatherCondition && (
                <div className="text-danger">
                  {formik.errors.weatherCondition}
                </div>
              )}
          </div>

          {/* Description field */}
          <div>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`${
                formik.touched.description && formik.errors.description
                  ? "border-danger"
                  : ""
              }`}
            />
            <label
              htmlFor="description "
              className={`${
                formik.touched.description && formik.errors.description
                  ? "text-danger"
                  : ""
              }`}
            >
              Description
            </label>
            {formik.touched.description && formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </div>

          {/* Submit button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default InputNewPieceForm;
