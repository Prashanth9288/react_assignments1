import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./feedbackSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
