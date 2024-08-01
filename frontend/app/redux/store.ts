import { configureStore } from "@reduxjs/toolkit";
import reduxRootReducer from "./reducers/reduxRootReducer";

export const store = configureStore({
  reducer: reduxRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
