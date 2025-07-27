import React from "react";

const Button = ({ text, highlighted }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white font-medium transition ${
        highlighted ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-300 hover:bg-gray-400 text-black"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
