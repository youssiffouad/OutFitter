import styles from "../../styles/InputNewPieceStyle.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

// Define your validation schema using Yup
const validationSchema = Yup.object({
  image: Yup.mixed().required("Image is required"),
  occasion: Yup.string().required("occasion is required"),
  favouritecolor: Yup.string().required("favouritecolor is required"),
  dayornight: Yup.string().required("dayornight is required"),
});

const OutfitGeneratorForm = () => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      image: null,
      occasion: "",
      favouritecolor: "",
      dayornight: "",
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
        <h4 className="text-black mb-5">Generate Outfit</h4>
        {/* Image upload */}

        {/* occasion selection */}
        <div>
          <input
            type="text"
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
          />
          <label
            htmlFor="occasion"
            className={`${
              formik.touched.occasion && formik.errors.occasion
                ? "text-danger"
                : ""
            }`}
          >
            occasion
          </label>
          {formik.touched.occasion && formik.errors.occasion && (
            <div className="text-danger">{formik.errors.occasion}</div>
          )}
        </div>

        {/* favouritecolor selection */}
        <div>
          <input
            type="color"
            id="favouritecolor"
            name="favouritecolor"
            className={`${
              formik.touched.favouritecolor && formik.errors.favouritecolor
                ? "border-danger"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.favouritecolor}
          />
          <label
            htmlFor="favouritecolor"
            style={{ top: "-10px" }}
            className={`${
              formik.touched.favouritecolor && formik.errors.favouritecolor
                ? "text-danger"
                : ""
            }`}
          >
            Favourite Color
          </label>
          {formik.touched.favouritecolor && formik.errors.favouritecolor && (
            <div className="text-danger">{formik.errors.favouritecolor}</div>
          )}
        </div>

        {/* dayornight field */}
        <div>
          <input
            type="text"
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
          />
          <label
            htmlFor="dayornight "
            className={`${
              formik.touched.dayornight && formik.errors.dayornight
                ? "text-danger"
                : ""
            }`}
          >
            Day or Night
          </label>
          {formik.touched.dayornight && formik.errors.dayornight && (
            <div className="text-danger">{formik.errors.dayornight}</div>
          )}
        </div>

        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OutfitGeneratorForm;
