import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Check from "../../middleware/auth/Check";
import formatRupiah from "../../helpers/formatRupiah";
import { ApiHistory } from "../../helpers/api";
import { LuHistory } from "react-icons/lu";
import EmptyData from "../../components/dashboard/EmptyData";

export default function AllHistory() {
  const isGuest = Check.isGuest();
  const [data, setData] = useState();

  useEffect(() => {
    if (!isGuest) {
      ApiHistory.get().then(({ data }) => setData(data));
    }
  }, [isGuest]);

  const uniqueData = [
    ...new Map(data?.map((item) => [item.orderId, item])).values(),
  ];

  if (!data) return "Loading..";
  if (data.length == 0)
    return (
      <EmptyData
        message={"you dont have any History Order"}
        icon={LuHistory}
        link={"/dashboard/cart"}
      />
    );
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Order Id
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Items
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Total
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {uniqueData?.map((item, id) => {
              // get cartItem with orderId
              const cartItem = data?.filter(
                (item2) => item2.orderId == item.orderId
              );

              // calculate totalPrice
              let totalPrice = 0;
              cartItem.map(
                (item) => (totalPrice += item.quantity * item.product.price)
              );

              // return data
              return (
                <tr key={id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.orderId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(item.createdAt).toLocaleString("id-ID")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {cartItem.length}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {formatRupiah(totalPrice)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <Link to={`/dashboard/history/${item.orderId}`}>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                        Detail
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
