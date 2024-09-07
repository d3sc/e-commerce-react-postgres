import React, { useContext, useEffect, useState } from "react";
import Check from "../../middleware/auth/Check";
import { AuthContext } from "../../context/AuthContext";
import NotFound from "../NotFound";
import { ApiUsers } from "../../helpers/api";

export default function AllUsers() {
  const isGuest = Check.isGuest();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState();

  useEffect(() => {
    ApiUsers.getUsers().then(({ data }) => setData(data));
  }, []);

  if (isGuest || user?.name != "admin")
    return <NotFound code={401} message="Unauthorized user" />;
  if (!user) return "Loading..";
  return (
    <div className="p-4">
      <h1 className="font-bold">List of All Users</h1>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                Email
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.map((item, index) => (
              <tr key={index} className="odd:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
