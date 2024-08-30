import React, { useContext } from "react";
import Check from "../../middleware/auth/Check";
import { AuthContext } from "../../context/AuthContext";
import NotFound from "../NotFound";

export default function AllProducts() {
  const isGuest = Check.isGuest();
  const { user } = useContext(AuthContext);
  if (isGuest || user?.name != "admin")
    return <NotFound code={401} message="Unauthorized user" />;
  if (!user) return "Loading..";
  return (
    <div>
      <h1>Products manager page</h1>
      {user.name}
    </div>
  );
}
