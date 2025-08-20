import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feedback, FeedbackFilters } from "./types";
import { v4 as uuid } from "uuid";

interface FeedbackState {
  items: Feedback[];
  filters: FeedbackFilters;
}

const initialState: FeedbackState = {
  items: [],
  filters: {},
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addFeedback: (
      state,
      action: PayloadAction<Omit<Feedback, "id" | "date">>
    ) => {
      const newFeedback: Feedback = {
        id: uuid(),
        date: new Date().toISOString(),
        ...action.payload,
      };
      state.items.push(newFeedback);
    },
    removeFeedback: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((f) => f.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<FeedbackFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
});

export const { addFeedback, removeFeedback, setFilters, clearFilters } =
  feedbackSlice.actions;
export default feedbackSlice.reducer;
