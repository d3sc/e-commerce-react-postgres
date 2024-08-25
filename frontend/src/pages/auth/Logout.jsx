import axios from "axios";
import React, { useContext, useEffect } from "react";
import Check from "../../middleware/auth/Check";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const isGuest = Check.isGuest();
  useEffect(() => {
    if (!isGuest) {
      setUser(null);
      axios.get("/logout").then(({ data }) => {
        navigate(`/login?message=${encodeURIComponent(data)}`);
      });
    }
  }, [isGuest]);
  return <div>redirect..</div>;
}
