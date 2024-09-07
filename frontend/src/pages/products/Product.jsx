import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiProducts } from "../../helpers/api";
import Check from "../../middleware/auth/Check";
import { AuthContext } from "../../context/AuthContext";
import NotFound from "../NotFound";

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState();
  // authorization
  const isGuest = Check.isGuest();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    ApiProducts.show(id).then(({ data }) => setData(data));
  }, []);

  if (!user || !data) return "Loading..";
  if (isGuest || user?.name != "admin")
    return <NotFound code={401} message="Unauthorized user" />;

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="">
          <img src={data.image} alt="image" className="sm:max-w-md" />
        </div>
        <dl className="-my-3 divide-y divide-gray-100 text-sm grid gap-4">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Name</dt>
            <dd className="text-gray-700 sm:col-span-2">{data.name}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Price</dt>
            <dd className="text-gray-700 sm:col-span-2">${data.price}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Description</dt>
            <dd className="text-gray-700 sm:col-span-2">{data.description}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Action</dt>
            <dd className="text-gray-700 sm:col-span-2 flex items-center">
              <div className="flex gap-4 mt-2 lg:mt-0">
                <Link
                  to={`/dashboard/product/edit/${data.id}`}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Edit
                </Link>
                <Link
                  to={`/dashboard/product/delete/${data.id}`}
                  className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                >
                  Delete
                </Link>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
