// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

import backport from "../helpers/backendport";

const initialState = {
  user: null,
  token: null, // Add token field to store JWT token
  popupMsg: "",
  popupDisplay: false,
  popupTouched: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload; // Update token in state
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setPopupMsg(state, action) {
      state.popupMsg = action.payload;
    },
    setPopupDisplay(state, action) {
      state.popupDisplay = action.payload;
    },
    setPopupTouched(state, action) {
      state.popupTouched = action.payload;
    },
  },
});

export const {
  setUser,
  setToken,
  setLoading,
  setError,
  setPopupMsg,
  setPopupDisplay,
  setPopupTouched,
} = userSlice.actions;

// Action creator for signup process
export const signUp = (userData) => async (dispatch) => {
  try {
    // Make API call to signup endpoint
    const response = await fetch(`http://localhost:${backport}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log("here is the response", response);

    if (!response.ok) {
      // Handle HTTP error
      throw new Error("Failed to sign up");
    }

    const data = await response.json();
    console.log("here is the response data", data);
    const users = await fetch(`http://localhost:${backport}/user/view`);
    console.log("here are the users i got from back", await users.json());

    // Dispatch success action with user data
    dispatch(setUser(data));

    // Dispatch loading complete action
    dispatch(setLoading(false));
  } catch (error) {
    // Dispatch error action
    dispatch(setError(error.message));
    // Dispatch loading complete action
    dispatch(setLoading(false));
  }
};

// Action creator for login process (to get JWT token)
export const login = (credentials, navigate) => async (dispatch) => {
  try {
    // Dispatch loading action
    dispatch(setPopupDisplay(false));
    const loginPayload = {
      name: credentials.username,
      password: credentials.password,
    };

    // Make API call to login endpoint
    const response = await fetch(`http://localhost:${backport}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });

    if (!response.ok) {
      // Handle HTTP error
      const errmsg = await response.json();
      console.log(errmsg.error);
      throw new Error(errmsg.error);
    }

    const data = await response.json();
    console.log("here is the data i got after logging in", data);
    localStorage.setItem("token", data.token);
    navigate("/home");

    // Dispatch success action with user data and token
    dispatch(setUser(data.id));
    dispatch(setToken(data.token));

    // Dispatch loading complete action
    dispatch(setLoading(false));
  } catch (error) {
    // Dispatch error action
    console.log(error.message);
    dispatch(setPopupDisplay(true));
    dispatch(setPopupMsg(error.message));
  }
};

export default userSlice.reducer;
