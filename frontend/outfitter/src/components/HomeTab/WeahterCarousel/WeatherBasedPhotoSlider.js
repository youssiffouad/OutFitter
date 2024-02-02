import { useState, useEffect } from "react";
import styles from "../../../styles/WeatherSlider.module.css"; // Import the CSS module
import WeatherSliderArrayPhotos from "./weatherTransitionPhotos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const WeahterImageSLider = () => {
  const [currentindex, setCurrentindex] = useState(0);

  const imageLinks = WeatherSliderArrayPhotos;

  const nextImage = () => {
    setCurrentindex((prevIndex) => (prevIndex + 1) % imageLinks.length);
  };

  const prevImage = () => {
    setCurrentindex(
      (prevIndex) => (prevIndex - 1 + imageLinks.length) % imageLinks.length
    );
  };
  useEffect(() => {
    // Automatically transition to the next image every 5 seconds
    const interval = setInterval(() => {
      nextImage();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [nextImage]);

  return (
    <div className={styles.imageContainer}>
      <div className={styles.arrowsContainer}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={{
            fontSize: "2em",
            color: "white",
            cursor: "pointer",
            padding: "10px",
          }}
          onClick={prevImage}
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{
            fontSize: "2em",
            color: "white",
            cursor: "pointer",
            padding: "10px",
          }}
          onClick={nextImage}
        />
      </div>
      <h2>
        weahter <br /> based <br /> suggestions{" "}
      </h2>

      <img src={imageLinks[currentindex]} alt={`slide${currentindex + 1}`} />
    </div>
  );
};

export default WeahterImageSLider;
