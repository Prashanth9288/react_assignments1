
import React, { useState, useEffect } from 'react';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      setQuote({ content: data.content, author: data.author });
    } catch (err) {
      setQuote({ content: 'Failed to fetch quote.', author: '' });
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-xl bg-white rounded-xl shadow-lg p-8 text-center transition-opacity duration-300">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Daily Quote Generator</h1>

        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <p className="text-xl font-medium text-gray-800 mb-4">"{quote?.content}"</p>
            <p className="text-gray-500 italic mb-6">— {quote?.author || 'Unknown'}</p>
          </>
        )}

        <button
          onClick={fetchQuote}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get New Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator;
