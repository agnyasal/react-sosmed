import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/slices/usersSlices";

export default configureStore({
  reducer: {
    user: usersReducer,
  },
});
