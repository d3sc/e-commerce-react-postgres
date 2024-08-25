import React from "react";
import { ApiLikes } from "../helpers/api";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FaHeartCirclePlus } from "react-icons/fa6";
import axios from "axios";
import EmptyData from "../components/dashboard/EmptyData";
import Check from "../middleware/auth/Check";

export default function Likes() {
  const isGuest = Check.isGuest();
  const [data, setData] = useState();
  useEffect(() => {
    if (!isGuest)
      ApiLikes.get()
        .then(({ data }) => setData(data))
        .catch((err) => console.log(err));
  }, [isGuest]);

  const deleteHandle = (id) => {
    const updateLikes = data.filter((item) => item.id !== id);
    setData(updateLikes);
    ApiLikes.deleteLike(id);
  };

  if (!data) return "Loading..";
  if (data.length == 0)
    return (
      <EmptyData
        message={"you dont have any wishlist"}
        icon={FaHeartCirclePlus}
      />
    );
  return (
    <div className="mx-4">
      <h1 className="text-lg font-semibold py-4">Your Wishlist</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {data?.map((item, index) => (
          <div className="mb-12 bg-white" key={index}>
            <div href="#" className="group block">
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
              <div className="w-full flex justify-end items-start p-6">
                <button onClick={() => deleteHandle(item.id)}>
                  <IoIosHeart size={30} className="cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
