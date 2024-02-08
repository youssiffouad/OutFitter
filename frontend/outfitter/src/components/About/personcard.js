import img from "../../images/clothes4.jpg";
const AboutPersonCard = () => {
  return (
    <div className="container bg-light d-flex flex-column justify-content-center align-content-center flex-wrap mt-5">
      <img
        className="img-fluid "
        src={img}
        alt="This is  a PersonPhoto"
        style={{
          borderRadius: "50%",
          height: "200px",
          width: "200px",
          objectFit: "cover",
        }}
      />
      <div className="d-flex flex-column text-center">
        <h4>I am Person</h4>
        <p>some random text and blablabla</p>
      </div>
    </div>
  );
};

export default AboutPersonCard;
