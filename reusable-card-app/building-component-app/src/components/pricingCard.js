import React from "react";
import FeatureList from "./FeatureList";
import Button from "./Button";

const PricingCard = ({ title, features, price, highlighted }) => {
  return (
    <div className="border p-6 rounded-lg flex flex-col md:flex-row items-center justify-between shadow-sm">
      <div>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <FeatureList features={features} />
      </div>
      <div className="mt-6 md:mt-0 text-center md:text-right">
        <h3 className="text-2xl font-bold mb-2">{price}</h3>
        <Button text="Get Started" highlighted={highlighted} />
      </div>
    </div>
  );
};

export default PricingCard;
