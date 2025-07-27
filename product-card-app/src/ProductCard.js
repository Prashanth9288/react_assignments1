import React from 'react';

function ProductCard({ name, price, image, discount }) {
  return (
    <div className="border rounded-2xl p-4 shadow-md max-w-sm bg-white">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-xl" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-700">${price.toFixed(2)}</p>
        {discount !== undefined && (
          <span className="inline-block mt-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
