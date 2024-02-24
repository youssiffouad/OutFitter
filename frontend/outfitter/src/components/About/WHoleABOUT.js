import ProtectedRoute from "../../helpers/HOCProtectionRoute";
import AboutHeader from "./AboutHeader";
import AboutPersonCard from "./personcard";

const AboutWhole = () => {
  return (
    <ProtectedRoute>
      <div>
        <AboutHeader />
        <div className="d-flex flex-lg-row">
          <AboutPersonCard />
          <AboutPersonCard />
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default AboutWhole;
