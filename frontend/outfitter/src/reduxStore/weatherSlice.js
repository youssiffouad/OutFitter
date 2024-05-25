// weatherConditionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backport from "../helpers/backendport";

export const weatherConditionsSlice = createSlice({
  name: "weatherConditions",
  initialState: [],
  reducers: {
    setWeatherConditions: (state, action) => {
      return action.payload;
    },
  },
});

//thunk fn to fetch weather conditions
export const fetchWeatherConditions = createAsyncThunk(
  "weather/getCondtions",
  async (_, { dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:${backport}/weather/getCondtions`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather conditions");
      }
      const data = await response.json();
      console.log("here are the weather conditions", data.conditions);
      dispatch(setWeatherConditions(data.conditions));
    } catch (error) {
      throw new Error("Failed to fetch weather conditions");
    }
  }
);

export const { setWeatherConditions } = weatherConditionsSlice.actions;

export default weatherConditionsSlice.reducer;
