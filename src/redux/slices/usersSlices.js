import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    id: null,
    username: "",
    email: "",
  },
  reducers: {
    loginAction: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logoutAction: (state) => {
      state.id = null;
      state.username = "";
      state.email = "";
    },
  },
});

export const { loginAction, logoutAction } = usersSlice.actions;

export default usersSlice.reducer;
