import React, { createContext, useState, ReactNode, useContext } from "react";

export interface FeedbackData {
  name: string;
  email: string;
  rating: number | "";
  feedback: string;
}

interface FeedbackContextType {
  feedback: FeedbackData;
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackData>>;
  isValid: () => boolean;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedback, setFeedback] = useState<FeedbackData>({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  const isValid = () =>
    Boolean(
      feedback.name.trim() &&
      feedback.email.trim() &&
      feedback.rating &&
      feedback.feedback.trim()
    );

  return (
    <FeedbackContext.Provider value={{ feedback, setFeedback, isValid }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = (): FeedbackContextType => {
  const ctx = useContext(FeedbackContext);
  if (!ctx) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return ctx;
};
