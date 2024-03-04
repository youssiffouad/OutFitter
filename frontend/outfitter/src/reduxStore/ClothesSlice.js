// clothesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backport from "../helpers/backendport";

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
      console.log("here are the clothes fetched from server", data);
      dispatch(setClothes(data));
    } catch (err) {
      console.log("an error occured while fetching clothes", err);
    }
  }
);

export const addNewClothesPiece = createAsyncThunk(
  "clothes/addNewClothesPiece",
  async (formdata, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
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
      dispatch(fetchAllClothes());
    } catch (error) {
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
      const state = getState();
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
  async (id, { _, getState, dispatch }) => {
    try {
      const payload = { id };
      const token = localStorage.getItem("token");
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
      const state = getState();
      const updatedClothesItems = state.clothes.clothesItems.filter((item) => {
        if (item.id != id) {
          return item;
        }
      });
      console.log("here are the items after deletion", updatedClothesItems);
      dispatch(setClothes(updatedClothesItems));
    } catch (err) {
      console.log("failed to delete item", err);
    }
  }
);
export const clothesSlice = createSlice({
  name: "clothes",
  initialState: {
    clothesItems: [],
    selectedClothesPiece: "",
    displayForm: true,
  },
  reducers: {
    setClothes: (state, action) => {
      state.clothesItems = action.payload;
    },
    setSelectedClothesPiece: (state, action) => {
      state.selectedClothesPiece = action.payload;
    },
    setdispalyForm: (state, action) => {
      state.displayForm = action.payload;
    },
  },
});

export const { setClothes, setSelectedClothesPiece, setdispalyForm } =
  clothesSlice.actions;

export default clothesSlice.reducer;
