import React, { useState } from 'react';
import CorrectedText from './CorrectedText';

const corrections = {
  "teh": "the",
  "recieve": "receive",
  "adress": "address",
  "wierd": "weird",
  "thier": "their"
};

const AutoCorrectApp = () => {
  const [inputText, setInputText] = useState("");

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">AutoCorrect App</h1>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
        placeholder="Type something..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      
      <CorrectedText text={inputText} corrections={corrections} />
    </div>
  );
};

export default AutoCorrectApp;
