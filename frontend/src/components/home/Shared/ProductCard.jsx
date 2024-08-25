import React from "react";

export default function ProductCard({ image, text, price }) {
  return (
    <div>
      <div className="rounded-lg overflow-hidden grid gap-1">
        <img src={image} alt="image" />
        <p className="font-bold dark:text-white">{text}</p>
        <p className="font-bold dark:text-white">{price}</p>
      </div>
    </div>
  );
}
