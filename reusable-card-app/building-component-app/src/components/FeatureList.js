import React from "react";
import FeatureItem from "./FeatureItem";

const FeatureList = ({ features }) => {
  return (
    <ul className="space-y-2">
      {features.map((text, index) => (
        <FeatureItem key={index} text={text} />
      ))}
    </ul>
  );
};

export default FeatureList;
