import React, { ChangeEvent, FormEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../context/FeedbackContext";
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FeedbackFormPage: React.FC = () => {
  const { feedback, setFeedback, isValid } = useFeedback();
  const navigate = useNavigate();

  const errors = useMemo(() => {
    const e: Partial<Record<keyof typeof feedback, string>> = {};
    if (!feedback.name.trim()) e.name = "Name is required.";
    if (!feedback.email.trim()) e.email = "Email is required.";
    else if (!emailRegex.test(feedback.email)) e.email = "Enter a valid email.";
    if (!feedback.rating) e.rating = "Rating is required.";
    else if (typeof feedback.rating === "number" && (feedback.rating < 1 || feedback.rating > 5))
      e.rating = "Rating must be between 1 and 5.";
    if (!feedback.feedback.trim()) e.feedback = "Feedback is required.";
    return e;
  }, [feedback]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid() || Object.keys(errors).length > 0) {
      alert("Please fix validation errors before continuing.");
      return;
    }
    navigate("/summary");
  };

  return (
    <div className="container">
      <h1 className="title">Customer Feedback</h1>
      <p className="subtitle">Please fill out the form below.</p>

      <form onSubmit={handleSubmit} noValidate className="card">
        <InputField
          label="Name"
          name="name"
          value={feedback.name}
          placeholder="Jane Doe"
          onChange={handleInputChange}
          required
          error={errors.name}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={feedback.email}
          placeholder="jane@example.com"
          onChange={handleInputChange}
          required
          error={errors.email}
        />

        <InputField
          label="Rating (1–5)"
          name="rating"
          type="number"
          min={1}
          max={5}
          value={feedback.rating}
          placeholder="5"
          onChange={handleInputChange as any}
          required
          error={errors.rating}
        />

        <TextAreaField
          label="Feedback"
          name="feedback"
          value={feedback.feedback}
          placeholder="Tell us about your experience…"
          onChange={handleInputChange as any}
          required
          error={errors.feedback}
        />

        <div className="actions">
          <button type="submit" className="btn primary">
            Go to Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackFormPage;
