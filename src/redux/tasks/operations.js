import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://todolist-app-6cqj.onrender.com";

export const fetchTask = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/task");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getTaskById = createAsyncThunk(
  "task/getById",
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.get(`/task/${taskId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "task/addTask",
  async ({ title, description, columnName }, thunkAPI) => {
    try {
      const taskData = {
        title,
        description,
      };
      const response = await axios.post("/task", taskData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (e) {
      console.error("task is not added");
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ taskId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/task/${taskId}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, thunkAPI) => {
    console.log(taskId);
    try {
      await axios.delete(`/task/${taskId}`);
      return { _id: taskId };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
