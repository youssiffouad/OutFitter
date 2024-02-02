import GridWithText from "./HomeTab/ImagegridContainer/ImagesWithtext";
import WeahterImageSLider from "./HomeTab/WeahterCarousel/WeatherBasedPhotoSlider";
import HeaderPhoto from "./HomeTab/Header/headerPhoto";
import OccasionPhotos from "./HomeTab/OccasionPhotosContainer/occasionPhotos";
import Footer from "./HomeTab/footer/footer";

const HomeTab = () => {
  return (
    <>
      <HeaderPhoto />
      <GridWithText />
      <WeahterImageSLider />
      <OccasionPhotos />
      <Footer />
    </>
  );
};
export default HomeTab;
