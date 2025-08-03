import React, { useEffect, useState } from "react";

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.quotable.io/random");
      const data = await res.json();
      setQuote({ content: data.content, author: data.author });
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({ content: "Failed to load quote", author: "Unknown" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-xl text-center">
        {loading ? (
          <div className="animate-spin h-10 w-10 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4" />
        ) : (
          <>
            <p className="text-xl font-semibold mb-4">&ldquo;{quote.content}&rdquo;</p>
            <p className="text-sm text-gray-600 mb-6">— {quote.author}</p>
          </>
        )}
        <button
          onClick={fetchQuote}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition"
        >
          Get New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
