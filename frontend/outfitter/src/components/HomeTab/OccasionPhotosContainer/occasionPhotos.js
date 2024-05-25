import photos from "./photosArray";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const OccasionPhotos = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <h2 className="text-center">Occasion Based Outfits</h2>
        {photos.map((link, index) => (
          <div key={index} className="col-md-3 mb-4">
            <img
              src={link.src}
              alt={`Occasionphoto No. ${index + 1}`}
              className="img-fluid h-100  border border-secondary"
              style={{ objectFit: "cover", objectPosition: "50% 50%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default OccasionPhotos;
