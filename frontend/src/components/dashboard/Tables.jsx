import React, { useState } from "react";
import Quantity from "./Quantity";

export default function Tables({ data, setCounter }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Image
              </th>
              <th className="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Quantity
              </th>
              <th className="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data
              ?.sort((a, b) => a.id - b.id)
              .map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <img
                      src={item.product.image}
                      alt=""
                      className="w-32 h-32 rounded-md border-4 border-white"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.product.name}
                  </td>
                  <Quantity item={item} setCounter={setCounter} />
                  <td className="whitespace-nowrap px-4 py-2">
                    <a
                      href="#"
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
