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
        if (Array.isArray(action.payload.data)) {
          state.items = action.payload.data;
        } else {
          state.items = [];
        }
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.error = action.payload.data;
      })
      .addCase(getTaskById.pending, (state) => {
        state.error = null;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload.data.task;
        state.items = state.items.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (task) => task._id !== action.payload._id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        if (action.payload?.status === 404) {
          const taskId = action.meta.arg;
          state.items = state.items.filter((task) => task._id !== taskId);
        }
        state.error = action.payload;
      });
  },
});

export const taskReducer = taskSlice.reducer;
