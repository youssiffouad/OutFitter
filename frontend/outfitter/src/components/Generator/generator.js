import { useDispatch, useSelector } from "react-redux";
import OutfitGallery from "./OutfitGallery";
import GenerateNewOutfit from "./generateNewOutfit";
import GeneratorHeader from "./headerGenerator";
import usePopUp from "../../hooks/use_popup";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { setenablePopup } from "../../reduxStore/OutfitSlice";

const Generator = () => {
  const popupMsgText = useSelector((state) => state.outfit.popuptext);
  const popupDisplay = useSelector((state) => state.outfit.popupDisplay);
  const enablePopup = useSelector((state) => state.outfit.enablePopup);
  const dispatch = useDispatch();

  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();
  useEffect(() => {
    if (enablePopup) {
      controlDisplay(popupDisplay);
      controlMsgContent(popupMsgText);
      dispatch(setenablePopup(false));
    }
  }, [
    popupMsgText,
    Msgcomponent,
    controlDisplay,
    controlMsgContent,
    popupDisplay,
    dispatch,
    enablePopup,
  ]);
  return (
    <div
      className="container-fluid bg-dark"
      style={{ height: "calc(-60px + 100vh)" }}
    >
      {createPortal(Msgcomponent(), document.getElementById("popupPortal"))}{" "}
      <GeneratorHeader />
      <GenerateNewOutfit />
      <OutfitGallery />
    </div>
  );
};
export default Generator;
