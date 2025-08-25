import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feedback, FeedbackState } from "../../types/feedback";
import { v4 as uuidv4 } from "uuid";

const initialState: FeedbackState = {
  feedbacks: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addFeedback: (state, action: PayloadAction<Omit<Feedback, "id" | "date">>) => {
      const newFeedback: Feedback = {
        id: uuidv4(),
        date: new Date().toISOString(),
        ...action.payload,
      };
      state.feedbacks.push(newFeedback);
    },
    removeFeedback: (state, action: PayloadAction<string>) => {
      state.feedbacks = state.feedbacks.filter(f => f.id !== action.payload);
    },
    clearFeedback: (state) => {
      state.feedbacks = [];
    }
  },
});

export const { addFeedback, removeFeedback, clearFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
