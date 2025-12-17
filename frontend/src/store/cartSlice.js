import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiSummary from "../../common";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await fetch(apiSummary.cartProducts.url, {
    method: apiSummary.cartProducts.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const data = await res.json();
  return data.success ? data.data : [];
});

const initialState = {
  products: [],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
  },
   extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
      state.count = action.payload.length;
    });
  },
});

export const { addToCartLocal, removeFromCartLocal } =
  cartSlice.actions;
export default cartSlice.reducer;
