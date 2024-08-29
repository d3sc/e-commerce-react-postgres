import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ApiLikes } from "../../../helpers/api";

export default function ProductCard({ productId, image, text, price }) {
  const { user } = useContext(AuthContext);
  const submitCart = async (e) => {
    if (user?.error) return alert(user.error);
    const data = await ApiLikes.store(productId, user.id);
    alert(data);
  };
  return (
    <div className="group overflow-hidden">
      <div className="rounded-lg overflow-hidden grid gap-1">
        <div className="overflow-hidden relative">
          <img
            src={image}
            alt="image"
            className="group-hover:blur-sm transition duration-300"
          />

          <button
            onClick={submitCart}
            className="bg-primary text-white rounded-full px-6 py-4 absolute left-1/2 top-1/3 transition duration-300 ease-in-out translate-x-96 group-hover:-translate-x-14"
          >
            add wishlist
          </button>
        </div>
        <p className="font-bold dark:text-white">{text}</p>
        <p className="font-bold dark:text-white">{price}</p>
      </div>
    </div>
  );
}
