import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = (state) => state.tasks.items;
