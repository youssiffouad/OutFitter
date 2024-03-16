// OccasionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backport from "../helpers/backendport";

export const OccasionsSlice = createSlice({
  name: "occasions",
  initialState: [],
  reducers: {
    setOccasions: (state, action) => {
      return action.payload;
    },
  },
});

// Define a thunk to fetch Occasions from the server
export const fetchOccasions = createAsyncThunk(
  "material/fetchOccasions",
  async (_, { dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:${backport}/occasions/fetchOccasions`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Occasions");
      }
      const data = await response.json();
      console.log("here are the Occasions", data.occasions);
      dispatch(setOccasions(data.occasions));
    } catch (error) {
      throw new Error("Failed to fetch Occasions");
    }
  }
);

export const { setOccasions } = OccasionsSlice.actions;

export default OccasionsSlice.reducer;
