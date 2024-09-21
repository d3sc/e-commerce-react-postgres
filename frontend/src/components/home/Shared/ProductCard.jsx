import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ApiLikes } from "../../../helpers/api";
import Swal from "sweetalert2";
import formatRupiah from "../../../helpers/formatRupiah";

export default function ProductCard({ productId, image, text, price }) {
  const { user } = useContext(AuthContext);
  const submitCart = async (e) => {
    if (user?.error || !user) {
      return Swal.fire({
        title: "Error",
        text: "Error, You're not signed!",
        icon: "error",
      });
    }
    const data = await ApiLikes.store(productId, user.id);

    if (data?.success) {
      Swal.fire({
        title: "Success!",
        text: data.success,
        icon: "success",
      });
    } else if (data?.error) {
      Swal.fire({
        title: "Error!",
        text: data.error,
        icon: "error",
      });
    }
  };
  return (
    <div className="group">
      <div className="group relative block overflow-hidden rounded-xl shadow-[10px_10px_40px_-15px_rgba(0,0,0,0.3)] shadow-slate-700">
        <img
          src={image}
          alt=""
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-200 bg-white dark:bg-[#111827] dark:border-gray-800 p-6">
          <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
            {" "}
            New{" "}
          </span>

          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white capitalize">
            {text}
          </h3>

          <p className="mt-1.5 text-sm text-gray-700 dark:text-white">
            {formatRupiah(price)}
          </p>

          <div className="mt-4">
            <button
              onClick={submitCart}
              className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105 dark:text-[#111827]"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
