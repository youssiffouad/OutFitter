// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import clothesReducer from "./ClothesSlice";
import weatherReducer from "./weatherSlice";
import materialReducer from "./materialSlice";
import outfitReducer from "./OutfitSlice";
import occasionReducer from "./occasionSlice";
import modeReducer from "./modeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    clothes: clothesReducer,
    material: materialReducer,
    weather: weatherReducer,
    outfit: outfitReducer,
    occasion: occasionReducer,
    mode: modeReducer,
  },
});

export default store;
