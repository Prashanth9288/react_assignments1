import React, { useState, ChangeEvent, FormEvent } from "react";

interface FeedbackFormState {
  name: string;
  email: string;
  rating: number | "";
  feedback: string;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormState>({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  const [submittedData, setSubmittedData] = useState<FeedbackFormState | null>(
    null
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.rating ||
      !formData.feedback
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmittedData(formData);

    setFormData({
      name: "",
      email: "",
      rating: "",
      feedback: "",
    });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Customer Feedback Form</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name: <br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Email: <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Rating (1–5): <br />
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Feedback: <br />
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>Thank you for your feedback!</h3>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Rating:</strong> {submittedData.rating}
          </p>
          <p>
            <strong>Feedback:</strong> {submittedData.feedback}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
