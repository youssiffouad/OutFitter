import styles from "../../styles/InputNewPieceStyle.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

// Define your validation schema using Yup
const validationSchema = Yup.object({
  image: Yup.mixed().required("Image is required"),
  category: Yup.string().required("Category is required"),
  color: Yup.string().required("Color is required"),
  description: Yup.string().required("Description is required"),
});

const InputNewPieceForm = () => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      image: null,
      category: "",
      color: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

  return (
    <div className={styles.formContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.formStyle}>
        <h4 className="text-black mb-5">Insert new Piece</h4>
        {/* Image upload */}
        <div>
          <label htmlFor="image" style={{ top: "-25px", left: "0px" }}>
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(event) =>
              formik.setFieldValue("image", event.currentTarget.files[0])
            }
            style={{ cursor: "pointer" }}
          />
          {formik.touched.image && formik.errors.image && (
            <div className="text-danger">{formik.errors.image}</div>
          )}
        </div>

        {/* Category selection */}
        <div>
          <input
            type="text"
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
          />
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

        {/* Color selection */}
        <div>
          <input
            type="color"
            id="color"
            name="color"
            className={`${
              formik.touched.color && formik.errors.color ? "border-danger" : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.color}
          />
          <label
            htmlFor="color"
            style={{ top: "-10px" }}
            className={`${
              formik.touched.color && formik.errors.color ? "text-danger" : ""
            }`}
          >
            Color
          </label>
          {formik.touched.color && formik.errors.color && (
            <div className="text-danger">{formik.errors.color}</div>
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
  );
};

export default InputNewPieceForm;
