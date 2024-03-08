// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import clothesReducer from "./ClothesSlice";
import weatherReducer from "./weatherSlice";
import materialReducer from "./materialSlice";
import outfitReducer from "./OutfitSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    clothes: clothesReducer,
    material: materialReducer,
    weather: weatherReducer,
    outfit: outfitReducer,
  },
});

export default store;
