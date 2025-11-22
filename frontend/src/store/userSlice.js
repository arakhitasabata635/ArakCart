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

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
