// clothesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backport from "../helpers/backendport";

//thunk to fetch All Clothes of cetain user
export const fetchAllClothes = createAsyncThunk(
  "clothes/fetchAllClothes",
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:${backport}/user/fetchAllClothes`,
        {
          headers: { authorization: token },
        }
      );
      const data = await response.json();
      console.log(
        "here is the response message received from server",
        data.message
      );
      dispatch(setClothes(data.clothesData));
    } catch (err) {
      console.log("an error occured while fetching clothes", err);
    }
  }
);

//thunk to add new piece for certain user
export const addNewClothesPiece = createAsyncThunk(
  "clothes/addNewClothesPiece",
  async (formdata, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("jfndkjfnkldsl");
      const response = await fetch(
        `http://localhost:${backport}/user/addNewClothesPiece`,
        {
          method: "POST",
          headers: {
            authorization: token,
            phototype: "ClothesPhoto",
          },
          body: formdata,
        }
      );
      const data = await response.json();
      console.log(
        "here is the reponse meg from server on adding new piece",
        data
      );
      dispatch(setpopupMsgText(data.message));
      dispatch(fetchAllClothes());
      dispatch(setdisplayAddPiecceForm(false));
      dispatch(setPopupDisplay(true));
    } catch (error) {
      dispatch(setpopupMsgText(error.message));
      dispatch(setPopupDisplay(true));
      throw new Error("An error occurred while adding new clothes piece");
    }
  }
);

//redux thunk to add certian clothes piece to favourites o remove it
export const addToFavourites = createAsyncThunk(
  "clothes/addToFavourites",
  async (clothesId, { _, getState, dispatch }) => {
    try {
      const payload = { id: clothesId };
      console.log("here is the clothes id at clinet side", payload);
      const token = localStorage.getItem("token");
      const state = getState();
      const response = await fetch(
        `http://localhost:${backport}/clothes/addTofavourites`,
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

      //set thte state of that specific clothes items that has been added to favourites

      const updatedClothesItems = state.clothes.clothesItems.map(
        (clothesItem) => {
          if (clothesItem.id === clothesId) {
            return { ...clothesItem, favourite: !clothesItem.favourite }; // Assuming there's a property isFavourite
          }
          return clothesItem;
        }
      );

      dispatch(setClothes(updatedClothesItems));

      console.log("here is the response msg after adding to fav", data);
    } catch (err) {
      console.log("failed to add to fav", err);
    }
  }
);

//redux thunk to delete certain clothes item
export const deleteClothesItem = createAsyncThunk(
  "clothes/deleteItem",
  async (id, { getState, dispatch }) => {
    try {
      const payload = { id };
      const token = localStorage.getItem("token");
      const state = getState();
      const response = await fetch(
        `http://localhost:${backport}/clothes/deleteClothesItem`,
        {
          method: "POST",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("failed to delete item");
      }
      const data = await response.json();
      console.log("here is the response after deleting item", data);
      const updatedClothesItems = state.clothes.clothesItems.filter((item) => {
        if (item.id != id) {
          return item;
        }
      });
      console.log("here are the items after deletion", updatedClothesItems);
      dispatch(setClothes(updatedClothesItems));
      dispatch(setpopupMsgText(data.message));
      dispatch(setPopupDisplay(true));
    } catch (err) {
      dispatch(setpopupMsgText(err.message));
      dispatch(setPopupDisplay(true));
      console.log("failed to delete item", err);
    }
  }
);
export const clothesSlice = createSlice({
  name: "clothes",
  initialState: {
    clothesItems: [],
    selectedClothesPiece: "",
    displayAddPiecceForm: false,
    popupMsgText: "",
    popupDisplay: false,
  },
  reducers: {
    setClothes: (state, action) => {
      state.clothesItems = action.payload;
    },
    setSelectedClothesPiece: (state, action) => {
      state.selectedClothesPiece = action.payload;
    },
    setdisplayAddPiecceForm: (state, action) => {
      state.displayAddPiecceForm = action.payload;
    },
    setpopupMsgText: (state, action) => {
      state.popupMsgText = action.payload;
    },
    setPopupDisplay: (state, action) => {
      state.popupDisplay = action.payload;
    },
  },
});

export const {
  setClothes,
  setSelectedClothesPiece,
  setdisplayAddPiecceForm,
  setpopupMsgText,
  setPopupDisplay,
} = clothesSlice.actions;

export default clothesSlice.reducer;
