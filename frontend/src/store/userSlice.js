import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiSummary from "../../common";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await fetch(apiSummary.current_user.url, {
    method: apiSummary.current_user.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const data = await res.json();
  return data.success ? data.data : null;
});

export const fetchCartCount = createAsyncThunk("user/fetchCartCount",
  async () => {
    const res = await fetch(apiSummary.cartCount.url, {
      method: apiSummary.cartCount.method,
      credentials: "include",
    });

    const data = await res.json();
    return data.success ? data.data : 0;
  }
);

const initialState = {
  user: null,
  cartCount: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    addToCartLocal(state) {
      state.cartCount += 1;
    },
    removeFromCartLocal(state) {
      state.cartCount -= 1;
    },
  },
extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.cartCount = action.payload;
      });
  },
});

export const { logout , addToCartLocal, removeFromCartLocal } = userSlice.actions;
export default userSlice.reducer;
