import React, { useContext, useEffect, useState } from "react";
import Check from "../../middleware/auth/Check";
import { AuthContext } from "../../context/AuthContext";
import NotFound from "../NotFound";
import { ApiProducts } from "../../helpers/api";
import { Link, useSearchParams } from "react-router-dom";

export default function AllProducts() {
  const isGuest = Check.isGuest();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState();

  const [searchParams] = useSearchParams();
  const pageParams = searchParams.get("message");
  const [notif, setNotif] = useState("");

  useEffect(() => {
    ApiProducts.get().then(({ data }) => setData(data));
  }, []);

  useEffect(() => {
    setNotif(pageParams);
  }, [pageParams]);

  if (isGuest || user?.name != "admin")
    return <NotFound code={401} message="Unauthorized user" />;
  if (!user || !data) return "Loading..";
  return (
    <div className="p-4">
      <h1>Products manager page</h1>
      <p>{notif}</p>
      <div className="mt-6">
        <Link
          to={"/dashboard/create/product"}
          className="bg-brandBlue/95 text-white py-2 px-6 rounded-md hover:bg-brandBlue"
        >
          create
        </Link>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="">
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                  Image
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                  Action
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data?.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <img
                      src={item.image}
                      alt=""
                      className="w-32 h-32 rounded-md border-4 border-white"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    $120,000
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <Link
                      to={`/dashboard/product/${item.id}`}
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
