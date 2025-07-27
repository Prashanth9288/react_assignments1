import React from "react";
import PricingCard from "./PricingCard";

const plans = [
  {
    title: "Starter",
    features: ["1 lorem ipsum", "Lorem, ipsum dolor.", "Monthly Updates"],
    price: "Free",
    highlighted: false,
  },
  {
    title: "Lorem Plus",
    features: ["1 lorem ipsum", "Lorem, ipsum dolor.", "Monthly Updates"],
    price: "$32.00",
    highlighted: true,
  },
  {
    title: "Lorem Pro",
    features: ["1 lorem ipsum", "Lorem, ipsum dolor.", "Monthly Updates"],
    price: "$50.00",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <div className="space-y-8">
      {plans.map((plan, idx) => (
        <PricingCard key={idx} {...plan} />
      ))}
    </div>
  );
};

export default PricingSection;
