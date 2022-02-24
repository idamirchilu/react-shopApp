import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialValue,
  reducers: {
    replaceItems(state, action) {
      state.cartItems = action.payload;
    },
    addItem(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        state.cartItems.push(action.payload);
        return;
      }
      state.cartItems[index].quantity++;
    },
    increaseItem(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[index].quantity++;
    },
    removeItem(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[index].quantity--;
      if (state.cartItems[index].quantity < 1) {
        state.cartItems.splice(index, 1);
      }
    },
  },
});

export const fetchCartData = (id) => {
  return async (dispatch) => {
    if (!!id !== false) {
      const identifire = id
        .split("@")[0]
        .split("")
        .filter(
          (item) =>
            !Number(item) && item !== "." && item !== "_" && item !== "-"
        )
        .join("");
      try {
        const res = await fetch(
          `https://redux-cart-420f0-default-rtdb.firebaseio.com/${identifire}.json`
        );
        const data = await res.json();

        if (!res.ok) throw new Error("failed to fetch cart data");

        if (data) {
          dispatch(cartSlice.actions.replaceItems(data));
        } else {
          dispatch(cartSlice.actions.replaceItems([]));
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
};

export const sendCartData = (cartData, id) => {
  return async () => {
    if (!!id !== false) {
      const identifire = id
        .split("@")[0]
        .split("")
        .filter(
          (item) =>
            !Number(item) && item !== "." && item !== "_" && item !== "-"
        )
        .join("");
      try {
        const res = await fetch(
          `https://redux-cart-420f0-default-rtdb.firebaseio.com/${identifire}.json`,
          {
            method: "PUT",
            body: JSON.stringify(cartData),
          }
        );
        if (!res.ok) {
          throw new Error("failed to send cart data");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
