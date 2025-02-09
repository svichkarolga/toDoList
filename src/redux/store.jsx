import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/slice.jsx";

const rootReducer = (state, action) => {
  return state;
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
