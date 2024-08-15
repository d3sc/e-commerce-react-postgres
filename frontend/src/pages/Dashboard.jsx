import { useState } from "react";
import ItemCard from "../components/dashboard/ItemCard";
import Check from "../middleware/auth/Check";
import { useEffect } from "react";
import { ApiCarts, ApiLikes, ApiProducts } from "../helpers/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  Check.isGuest();

  const [data, setData] = useState();
  const [likes, setLikes] = useState();
  useEffect(() => {
    ApiCarts.get().then(({ data }) => setData(data[0].cart_item));
    ApiLikes.get().then(({ data }) => setLikes(data));
  }, []);

  if (!data || !likes) return "Loading..";

  return (
    <div className="mx-4">
      {data.length != 0 ? (
        <>
          <div className="flex justify-between items-center py-4">
            <h1 className="text-lg font-semibold">Current Cart</h1>
            <Link
              to="/dashboard/cart"
              className="text-sm underline text-indigo-600"
            >
              See all
            </Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {data?.map((item, index) => (
              <ItemCard key={index} item={item.product} />
            ))}
          </div>
        </>
      ) : (
        ""
      )}

      <div className="flex justify-between items-center py-4">
        <h1 className="text-lg font-semibold">Your Wishlist</h1>
        <Link
          to="/dashboard/likes"
          className="text-sm underline text-indigo-600"
        >
          See all
        </Link>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {likes?.map((item, index) => (
          <ItemCard key={index} item={item.product} />
        ))}
      </div>
    </div>
  );
}
