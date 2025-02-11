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
        state.items.push(action.payload.data);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (task) => task._id !== action.payload._id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        if (action.payload?.status === 404) {
          // Якщо таск не знайдено (404), видаляємо його зі стану
          const taskId = action.meta.arg; // Отримуємо ID таску з аргументів
          state.items = state.items.filter((task) => task._id !== taskId);
        }
        state.error = action.payload;
      });
  },
});

export const taskReducer = taskSlice.reducer;
