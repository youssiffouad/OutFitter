import GridWithText from "./HomeTab/ImagegridContainer/ImagesWithtext";
import WeahterImageSLider from "./HomeTab/WeahterCarousel/WeatherBasedPhotoSlider";
import HeaderPhoto from "./HomeTab/Header/headerPhoto";
import OccasionPhotos from "./HomeTab/OccasionPhotosContainer/occasionPhotos";
import Footer from "./HomeTab/footer/footer";
import { useSelector } from "react-redux";
import ProtectedRoute from "../helpers/HOCProtectionRoute";

const HomeTab = () => {
  const userlogged = useSelector((state) => state.user.token);
  console.log(userlogged);
  return (
    <ProtectedRoute>
      <HeaderPhoto />
      <GridWithText />
      <WeahterImageSLider />
      <OccasionPhotos />
      <Footer />
    </ProtectedRoute>
  );
};
export default HomeTab;
