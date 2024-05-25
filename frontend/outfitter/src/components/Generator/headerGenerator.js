import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faA,
  faI,
  faTshirt,
  faMagic,
  faStar,
  faSun,
  faCloudRain,
  faSnowflake,
  faCloud,
  faSmile,
  faFrown,
  faGrin,
  faAngry,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const GeneratorHeader = () => {
  return (
    <div className="rounded-4 h-50 bg-info w-100 d-flex justify-content-center align-content-center flex-wrap flex-column over h-auto">
      <h2
        className="d-flex align-items-center mt-3"
        style={{ letterSpacing: "5px", wordSpacing: "6px" }}
      >
        YOUR MAGICAL{" "}
        <div
          style={{
            border: "3px solid white",
            borderRadius: "50%",
            padding: "3% 0px 3% 0px",
          }}
        >
          {" "}
          <FontAwesomeIcon
            icon={faA}
            style={{
              fontSize: "2rem",
              margin: "0.5rem",
              color: "whitesmoke",
            }}
          />
          <FontAwesomeIcon
            icon={faI}
            style={{
              fontSize: "2rem",
              margin: "0.5rem",
              color: "whitesmoke",
            }}
          />
        </div>
        WIZARD
      </h2>

      {/* Icons for weather conditions */}
      <div className="d-flex justify-content-evenly ">
        <FontAwesomeIcon
          icon={faSun}
          style={{ fontSize: "2rem", margin: "0.5rem", color: "#c96309" }}
        />
        <FontAwesomeIcon
          icon={faCloudRain}
          style={{ fontSize: "2rem", margin: "0.5rem", color: "#dbdbdb" }}
        />
        <FontAwesomeIcon
          icon={faSnowflake}
          style={{ fontSize: "2rem", margin: "0.5rem", color: "#dbf8fb" }}
        />
        <FontAwesomeIcon
          icon={faCloud}
          style={{ fontSize: "2rem", margin: "0.5rem", color: "#bbbbbb" }}
        />
      </div>
      <div className="d-flex justify-content-center ">
        <FontAwesomeIcon
          icon={faPlus}
          style={{ fontSize: "2rem", margin: "0.5rem", color: "white" }}
        />
      </div>

      {/* Icons for moods */}
      <div className="d-flex justify-content-evenly ">
        <FontAwesomeIcon
          icon={faSmile}
          style={{ fontSize: "2rem", margin: "0.5rem" }}
        />
        <FontAwesomeIcon
          icon={faFrown}
          style={{ fontSize: "2rem", margin: "0.5rem" }}
        />
        <FontAwesomeIcon
          icon={faGrin}
          style={{ fontSize: "2rem", margin: "0.5rem" }}
        />
        <FontAwesomeIcon
          icon={faAngry}
          style={{ fontSize: "2rem", margin: "0.5rem" }}
        />
      </div>
      {/* Different magic stick icons */}
      <div
        className="d-flex justify-content-center "
        style={{
          position: "relative",
          overflow: "visible",
          marginLeft: "10%",
        }}
      >
        <FontAwesomeIcon
          icon={faMagic}
          style={{ fontSize: "2rem", margin: "0.5rem", color: "gold" }}
        />

        <FontAwesomeIcon
          icon={faStar}
          style={{
            position: "absolute",
            height: "10px",
            bottom: "0px",
            color: "gold",
          }}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{
            position: "absolute",
            height: "10px",
            bottom: "41%",
            left: "45%",
            color: "gold",
          }}
        />
      </div>
      <div
        style={{
          border: "3px solid white",
          borderRadius: "20%",
          padding: "1px 0px 1px 0px",
          margin: "auto",
          marginBottom: "2px",
        }}
      >
        {" "}
        <FontAwesomeIcon
          icon={faTshirt}
          style={{ fontSize: "2rem", margin: "0.5rem" }}
        />
      </div>
    </div>
  );
};

export default GeneratorHeader;
