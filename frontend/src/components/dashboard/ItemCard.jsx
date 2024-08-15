import React from "react";
import { TiAttachment } from "react-icons/ti";

export default function ItemCard({ item }) {
  return (
    <div className="mb-12">
      <a href="#" className="group block">
        <img
          src={item.image}
          alt=""
          className="h-[350px] w-full object-cover sm:h-[450px]"
        />

        <div className="mt-3 flex justify-between text-sm">
          <div>
            <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
              {item.name}
            </h3>

            <p className="mt-1.5 text-pretty text-xs text-gray-500">
              {item.description}
            </p>
          </div>

          <p className="text-gray-900">${item.price}</p>
        </div>
      </a>
    </div>
  );
}
