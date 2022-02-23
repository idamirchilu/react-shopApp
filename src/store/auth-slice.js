import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  haveAnAccount: false,
  userIsLogin: false,
  usersData: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    replace(state, action) {
      state.usersData = action.payload;
    },
    toggleForm(state) {
      state.haveAnAccount = !state.haveAnAccount;
    },
    logout(state) {
      state.userIsLogin = false;
    },
    register(state, action) {
      if (state.usersData.some((data) => data.email === action.payload.email)) {
        alert("this email has been used before!");
        return;
      }
      state.usersData = [...state.usersData, action.payload];
      state.userIsLogin = true;
    },
    login(state, action) {
      const index = state.usersData.findIndex(
        (data) => data.email === action.payload.email
      );
      if (index === -1) {
        alert("This Email Was NOT Registered, Please Register ");
        return;
      }
      if (state.usersData[index].password !== action.payload.password) {
        alert("password is wrong");
        return;
      }
      state.userIsLogin = true;
    },
  },
});

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://redux-cart-420f0-default-rtdb.firebaseio.com/users.json"
      );
      const data = await res.json();
      if (data) {
        dispatch(authSlice.actions.replace(data));
      } else {
        dispatch(authSlice.actions.replace([]));
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const sendUserData = (userData) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://redux-cart-420f0-default-rtdb.firebaseio.com/users.json",
        {
          method: "PUT",
          body: JSON.stringify(userData),
        }
      );
      if (!res.ok) {
        throw new Error("error");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const authActions = authSlice.actions;

export default authSlice;
