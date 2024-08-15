import axios from "axios";
import React from "react";
import Check from "../../middleware/auth/Check";

export default function Logout() {
  Check.isGuest();
  axios.get("/logout").then(({ data }) => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
    // navigate(`/login?message=${encodeURIComponent(data)}`);
  });
  return <div>redirect..</div>;
}
