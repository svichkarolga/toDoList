import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTask,
  getTaskById,
  addTask,
  deleteTask,
  updateTask,
} from "./operations";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    selectedTask: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.items = action.payload; // Оновлюємо список тасків
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getTaskById.pending, (state) => {
        state.error = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const taskReducer = taskSlice.reducer;
