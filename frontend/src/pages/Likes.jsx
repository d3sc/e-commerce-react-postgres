import { ApiCarts, ApiLikes } from "../helpers/api";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { FaHeartCirclePlus } from "react-icons/fa6";
import axios from "axios";
import EmptyData from "../components/dashboard/EmptyData";
import Check from "../middleware/auth/Check";
import Swal from "sweetalert2";
import formatRupiah from "../helpers/formatRupiah";

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

  const addToCart = async (productId, quantity) => {
    if (quantity <= 0 || !quantity) return alert("quantity invalid!");

    const data = await ApiCarts.getUserCart();
    if (data?.error) return alert(data.error);
    const cartId = data?.id ? data.id : undefined;

    const data2 = await ApiCarts.store(parseInt(quantity), productId, cartId);
    if (data2?.success) {
      Swal.fire({
        title: "Success!",
        text: data2.success,
        icon: "success",
      });
    } else if (data2?.error) {
      Swal.fire({
        title: "Error!",
        text: data2.error,
        icon: "error",
      });
    }
  };

  if (!data) return "Loading..";
  if (data.length == 0)
    return (
      <EmptyData
        message={"you dont have any wishlist"}
        icon={FaHeartCirclePlus}
        link={"/"}
      />
    );

  return (
    <div className="mx-4">
      <h1 className="text-lg font-semibold py-4">Your Wishlist</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {data?.map((item, index) => {
          let qtyItem = 1;

          return (
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

                  <p className="text-gray-900 text-xl">
                    {formatRupiah(item.product.price)}
                  </p>
                </div>
                <div className="w-full flex justify-end items-start p-6">
                  <button onClick={() => deleteHandle(item.id)}>
                    <IoIosHeart
                      size={30}
                      className="cursor-pointer hover:scale-110 transition-all duration-200"
                    />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => addToCart(item.product.id, qtyItem)}
                    className="py-2 px-4 bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 "
                  >
                    Add to Cart
                  </button>
                  <input
                    onChange={(e) => (qtyItem = e.target.value)}
                    type="number"
                    className="w-16 pl-4"
                    defaultValue={qtyItem}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
