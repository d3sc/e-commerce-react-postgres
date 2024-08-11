import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Check from "../../middleware/auth/Check";

export default function Logout() {
  Check.isGuest();
  const navigate = useNavigate();
  axios
    .get("/logout")
    .then(({ data }) => navigate(`/login?message=${encodeURIComponent(data)}`));
  return <div>redirect..</div>;
}
