import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiHistory } from "../../helpers/api";
import Check from "../../middleware/auth/Check";
import formatRupiah from "../../helpers/formatRupiah";

export default function History() {
  const { id } = useParams();
  const isGuest = Check.isGuest();
  const [data, setData] = useState();

  useEffect(() => {
    if (!isGuest) {
      ApiHistory.get().then(({ data }) => {
        setData(data);
      });
    }
  }, [isGuest]);

  return (
    <div className="flex justify-center items-center flex-wrap gap-10">
      {data
        ?.filter((item) => item.orderId == id)
        .map((item) => (
          <div
            className="w-[90%] flow-root rounded-lg border border-gray-100 py-3 shadow-sm"
            key={item.id}
          >
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Image</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="sm:max-w-md"
                  />
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Product Name</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {item.product.name}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Quantity</dt>
                <dd className="text-gray-700 sm:col-span-2">{item.quantity}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Price</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {formatRupiah(item.product.price)}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Sub Total</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {formatRupiah(item.quantity * item.product.price)}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">date</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {new Date(item.createdAt).toLocaleString("id-ID")}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Status</dt>
                <dd className="text-gray-700 sm:col-span-2">Paid</dd>
              </div>
            </dl>
          </div>
        ))}
    </div>
  );
}
