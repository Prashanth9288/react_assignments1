
import React from 'react';

const CorrectedText = ({ text, corrections }) => {
  if (!text) return <p className="text-gray-400 italic">Start typing above...</p>;

  const words = text.split(" ");
  let count = 0;

  const correctedWords = words.map(word => {
    const cleanWord = word.toLowerCase();
    if (corrections[cleanWord]) {
      count++;
      return corrections[cleanWord];
    }
    return word;
  });

  return (
    <div className="mt-4">
      <p className="text-green-700 font-medium">
        {correctedWords.join(" ")}
      </p>
      <p className="text-sm text-gray-500 mt-1">Words corrected: {count}</p>
    </div>
  );
};

export default CorrectedText;
