import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
      state.count = action.payload.length;
    },
    addToCartLocal(state, action) {
      state.items.push(action.payload);
      state.count += 1;
    },
    removeFromCartLocal(state, action) {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.count = state.items.length;
    },
  },
});

export const { setCart, addToCartLocal, removeFromCartLocal } =
  cartSlice.actions;
export default cartSlice.reducer;
