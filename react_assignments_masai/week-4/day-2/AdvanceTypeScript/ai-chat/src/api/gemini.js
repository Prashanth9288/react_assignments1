export async function fetchGeminiResponse(userInput) {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.AIzaSyDwfqa6X0KLJCjTdwdVNMYG3qS5O5lRdw4}`,
        },
        body: JSON.stringify({
          model: "gemini-1.5-flash",
          messages: [{ role: "user", content: userInput }],
        }),
      }
    );

    if (!res.ok) throw new Error("API request failed");

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || "No response.";
  } catch (err) {
    console.error(err);
    return "⚠️ Error fetching response.";
  }
}
