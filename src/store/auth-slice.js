import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
      state.email = null;
      localStorage.removeItem("email");
      state.isLoggedIn = !!state.token;
    },
    returnIsLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
