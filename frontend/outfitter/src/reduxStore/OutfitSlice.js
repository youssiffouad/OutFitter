import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backport from "../helpers/backendport";

const initialState = {
  outfits: [],
  generatedOutfit: {},
  loading: false,
  popupDisplay: false,
  popuptext: "",
};
export const outfitSLice = createSlice({
  name: "outfits",
  initialState: initialState,
  reducers: {
    setOutfits: (state, action) => {
      state.outfits = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPopupDisplay: (state, action) => {
      state.popupDisplay = action.payload;
    },
    setPopupText: (state, action) => {
      state.popuptext = action.payload;
    },
    setgeneratedOutfit: (state, action) => {
      state.generatedOutfit = action.payload;
    },
  },
});

/*
 *** Thunk to generate  new OUtFit for certain user
 */
export const generateNewOutfit = createAsyncThunk(
  "outfit/generate",
  async (formdata, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://local:${backport}/outfit/generate`, {
        method: "POST",
        headers: { authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      //data received should be 3 photos
      const data = await response.json();
      dispatch(setgeneratedOutfit(data.outfitClothes));
      dispatch(setPopupDisplay(true));
      dispatch(setPopupText(data.message));
      console.log("here is the data received after generating outfit");
    } catch (err) {
      console.log("an error occured while", err);
      dispatch(setPopupDisplay(true));
      dispatch(setPopupText(err.message));
    }
  }
);

export const {
  setOutfits,
  setLoading,
  setPopupDisplay,
  setPopupText,
  setgeneratedOutfit,
} = outfitSLice.actions;
export default outfitSLice.reducer;
