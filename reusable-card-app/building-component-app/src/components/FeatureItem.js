import React from "react";

const FeatureItem = ({ text }) => {
  return (
    <li className="flex items-center text-gray-700">
      <span className="text-green-500 mr-2">✔</span>
      {text}
    </li>
  );
};

export default FeatureItem;
