import React from "react";
import { ApiLikes } from "../helpers/api";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

export default function Likes() {
  const [data, setData] = useState();
  useEffect(() => {
    ApiLikes.get()
      .then(({ data }) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  if (!data) return "Loading..";
  return (
    <div className="mx-4">
      <h1 className="text-lg font-semibold py-4">Your Wishlist</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {data?.map((item, index) => (
          <div className="mb-12" key={index}>
            <a href="#" className="group block">
              <img
                src={item.product.image}
                alt=""
                className="h-[350px] w-full object-cover sm:h-[450px]"
              />

              <div className="mt-3 flex justify-between text-sm">
                <div>
                  <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
                    {item.product.name}
                  </h3>

                  <p className="mt-1.5 text-pretty text-xs text-gray-500">
                    {item.product.description}
                  </p>
                </div>

                <p className="text-gray-900">${item.product.price}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
