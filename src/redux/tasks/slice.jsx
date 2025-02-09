// import React from "react";
// import { createSlice } from "@reduxjs/toolkit";
// import { fetchTasks, addTask, deleteTask, updateTask } from "./operations";

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState: {
//     items: [],
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTasks.pending, (state) => {
//         state.error = false;
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.items = action.payload;
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(addTask.pending, (state) => {
//         state.error = false;
//       })
//       .addCase(addTask.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })
//       .addCase(addTask.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(deleteTask.pending, (state) => {
//         state.error = false;
//       })
//       .addCase(deleteTask.fulfilled, (state, action) => {
//         const index = state.items.findIndex(
//           (task) => task.id === action.payload.id
//         );
//         state.items.splice(index, 1);
//       })
//       .addCase(deleteTask.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       .addCase(updateTask.fulfilled, (state, action) => {
//         const index = state.items.findIndex(
//           (contact) => contact.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//       });
//   },
// });

// export default tasksSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, addTask, deleteTask, updateTask } from "./operations";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [], // Масив завдань
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Завантаження тасків
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload || []; // Якщо бекенд пустий, масив буде []
      })
      // Додавання таска (локально)
      .addCase(addTask.pending, (state, action) => {
        console.warn("⚠️ Бекенд не відповів, додаємо таск локально...");
        state.items.push(action.meta.arg); // Додаємо таск одразу в state
      })
      .addCase(addTask.fulfilled, (state, action) => {
        console.log("✅ Таск додано в бекенд:", action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        console.error("❌ ПОМИЛКА ДОДАВАННЯ ТАСКА:", action.payload);
      })
      // Видалення таска
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (task) => task.id !== action.payload.id
        );
      })
      // Оновлення таска
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

export default tasksSlice.reducer;
