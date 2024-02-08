import AboutHeader from "./AboutHeader";
import AboutPersonCard from "./personcard";

const AboutWhole = () => {
  return (
    <div>
      <AboutHeader />
      <div className="d-flex flex-lg-row">
        <AboutPersonCard />
        <AboutPersonCard />
      </div>
    </div>
  );
};
export default AboutWhole;
