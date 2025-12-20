import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiSummary from "../../common";
import { toast } from "react-toastify";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await fetch(apiSummary.current_user.url, {
    method: apiSummary.current_user.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const data = await res.json();
  return data.success ? data.data : null;
});

export const fetchCartCount = createAsyncThunk(
  "user/fetchCartCount",
  async () => {
    const res = await fetch(apiSummary.cartCount.url, {
      method: apiSummary.cartCount.method,
      credentials: "include",
    });

    const data = await res.json();
    return data.success ? data.data : 0;
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const res = await fetch(apiSummary.logout_user.url, {
    method: apiSummary.logout_user.method,
    credentials: "include",
  });

  return await res.json();
});

const initialState = {
  user: null,
  cartCount: 0,
  fetchingUserLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
        state.fetchingUserLoading = false;
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.cartCount = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          toast.success(action.payload.message);
          state.user = null;
          state.cartCount = 0;
        } else {
          toast.error(action.payload.message);
        }
      });
  },
});

export const { logout, addToCartLocal, removeFromCartLocal } =
  userSlice.actions;
export default userSlice.reducer;
