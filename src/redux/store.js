import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./tasks/slice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Конфігурація для `redux-persist`
const tasksPersistConfig = {
  key: "tasks",
  storage,
  blacklist: ["error", "selectedTask"],
  // whitelist: ["items"], // Зберігаємо лише `items`
};

const persistedTaskReducer = persistReducer(tasksPersistConfig, taskReducer);

export const store = configureStore({
  reducer: {
    tasks: persistedTaskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});
store.subscribe(() => {
  console.log("🔄 Стан Redux оновлено:", store.getState());
});

export const persistor = persistStore(store);
