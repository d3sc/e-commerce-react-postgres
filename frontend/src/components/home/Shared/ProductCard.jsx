import React from "react";

export default function ProductCard({ image, text, price }) {
  return (
    <div>
      <div className="rounded-lg overflow-hidden grid gap-1">
        <img src={image} alt="image" />
        <p className="font-bold">{text}</p>
        <p className="font-bold">{price}</p>
      </div>
    </div>
  );
}
