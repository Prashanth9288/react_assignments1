import { useState } from "react";
import { useChat } from "../context/chatContext";
import { fetchGeminiResponse } from "../api/gemini";

export default function ChatInput() {
  const { addMessage } = useChat();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({ role: "user", text: input });
    setLoading(true);

    const reply = await fetchGeminiResponse(input);
    addMessage({ role: "assistant", text: reply });

    setInput("");
    setLoading(false);
  }

  return (
    <form className="chat-input" onSubmit={handleSend}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        placeholder="Type a message..."
        aria-label="Chat input"
      />
      <button type="submit" disabled={loading}>
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
}
