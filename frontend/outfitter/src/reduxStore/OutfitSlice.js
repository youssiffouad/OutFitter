import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backport from "../helpers/backendport";

const initialState = {
  outfits: [],
  generatedOutfit: {},
  loading: false,
  popupDisplay: false,
  displayAddOutfitForm: false,
  popuptext: "",
  enablePopup: true,
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
    setdisplayAddOutfitForm: (state, action) => {
      state.displayAddOutfitForm = action.payload;
    },
    setenablePopup: (state, action) => {
      state.enablePopup = action.payload;
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
      console.log("here is the formdata before sending", formdata);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:${backport}/outfits/generate`,
        {
          method: "POST",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );
      //data received should be 3 photos
      const data = await response.json();
      dispatch(fetchAllOutfits());
      dispatch(setenablePopup(true));
      dispatch(setdisplayAddOutfitForm(false));
      dispatch(setPopupDisplay(true));
      dispatch(setPopupText(data.message));
      console.log("here is the data received after generating outfit", data);
    } catch (err) {
      console.log("an error occured while", err);
      dispatch(setPopupDisplay(true));
      dispatch(setPopupText(err.message));
    }
  }
);

/*
 *** Thunk to fetch all OUTFITS of certain user
 */
export const fetchAllOutfits = createAsyncThunk(
  "outfit/fetchall",
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:${backport}/user/fetchAllOutfits`,
        {
          headers: { authorization: token },
        }
      );
      const data = await response.json();
      console.log(
        "here is the response message received from server",
        data.message,
        data.outfits
      );
      dispatch(setOutfits(data.outfits));
    } catch (err) {
      console.log("an error occured while fetching OUTFITS", err);
    }
  }
);

/*
 ***redux thunk to add certian clothes piece to favourites o remove it
 */
export const addToFavourites = createAsyncThunk(
  "outfits/addToFavourites",
  async (outfitId, { _, getState, dispatch }) => {
    try {
      const payload = { id: outfitId };
      console.log(
        "here is the outfitTTTTTTTTTTTTTT id at clinet side",
        payload
      );
      const token = localStorage.getItem("token");
      const state = getState();
      const response = await fetch(
        `http://localhost:${backport}/outfits/addToFavoutites`,
        {
          method: "POST",
          headers: { authorization: token, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("failed to add to fav Internal server error");
      }
      const data = await response.json();

      //set thte state of that specific outfit items that has been added to favourites
      const updatedOutfitItems = state.outfit.outfits.map((OutfitItem) => {
        if (OutfitItem.id === outfitId) {
          return { ...OutfitItem, favourite: !OutfitItem.favourite }; // Assuming there's a property isFavourite
        }
        return OutfitItem;
      });

      dispatch(setOutfits(updatedOutfitItems));

      console.log("here is the response msg after adding to fav", data);
    } catch (err) {
      console.log("failed to add to fav", err);
    }
  }
);

export const {
  setOutfits,
  setLoading,
  setPopupDisplay,
  setPopupText,
  setdisplayAddOutfitForm,
  setgeneratedOutfit,
  setenablePopup,
} = outfitSLice.actions;
export default outfitSLice.reducer;
