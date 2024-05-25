// materialsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backport from "../helpers/backendport";

export const materialsSlice = createSlice({
  name: "materials",
  initialState: [],
  reducers: {
    setMaterials: (state, action) => {
      return action.payload;
    },
  },
});

// Define a thunk to fetch materials from the server
export const fetchMaterials = createAsyncThunk(
  "material/fetchMaterials",
  async (_, { dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:${backport}/material/getMaterials`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch materials");
      }
      const materials = await response.json();
      console.log("here are the materials", materials.materials);
      dispatch(setMaterials(materials.materials));
    } catch (error) {
      throw new Error("Failed to fetch materials");
    }
  }
);

export const { setMaterials } = materialsSlice.actions;

export default materialsSlice.reducer;
