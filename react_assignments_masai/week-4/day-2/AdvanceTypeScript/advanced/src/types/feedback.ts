export interface Feedback {
  id: string;
  name: string;
  comment: string;
  rating: number;
  date: string; 
}

export interface FeedbackState {
  feedbacks: Feedback[];
}
