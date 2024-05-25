// ModesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backport from "../helpers/backendport";

export const ModesSlice = createSlice({
  name: "modes",
  initialState: [],
  reducers: {
    setmodes: (state, action) => {
      return action.payload;
    },
  },
});

// Define a thunk to fetch modes from the server
export const fetchModes = createAsyncThunk(
  "material/fetchmodes",
  async (_, { dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:${backport}/modes/fetchModes`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch modes");
      }
      const data = await response.json();
      console.log("here are the modes", data.modes);
      dispatch(setmodes(data.modes));
    } catch (error) {
      throw new Error("Failed to fetch modes");
    }
  }
);

export const { setmodes } = ModesSlice.actions;

export default ModesSlice.reducer;
