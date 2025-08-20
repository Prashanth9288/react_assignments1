import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../context/FeedbackContext";

const FeedbackSummaryPage: React.FC = () => {
  const { feedback, isValid } = useFeedback();
  const navigate = useNavigate();

  // Guard route: if data invalid, redirect to form
  useEffect(() => {
    if (!isValid()) {
      alert("Please complete the form first.");
      navigate("/", { replace: true });
    }
  }, [isValid, navigate]);

  if (!isValid()) return null;

  return (
    <div className="container">
      <h1 className="title">Feedback Summary</h1>
      <div className="card">
        <div className="row">
          <span className="key">Name</span>
          <span className="value">{feedback.name}</span>
        </div>
        <div className="row">
          <span className="key">Email</span>
          <span className="value">{feedback.email}</span>
        </div>
        <div className="row">
          <span className="key">Rating</span>
          <span className="value">{feedback.rating}</span>
        </div>
        <div className="row">
          <span className="key">Feedback</span>
          <span className="value">{feedback.feedback}</span>
        </div>

        <div className="actions">
          <button className="btn" onClick={() => navigate("/")}>
            Back to Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSummaryPage;
