
export interface Feedback {
  id: string;
  name: string;
  comment: string;
  rating: number; 
  date: string; 
  tags?: string[];
}


export interface FeedbackFilters {
  rating?: number;
  date?: string;
  search?: string;
  tag?: string;
}
