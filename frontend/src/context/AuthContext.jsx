import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) axios.get("/profile").then(({ data }) => setUser(data));
  }, []);

  const cookie = Cookies.get("token");

  return (
    <AuthContext.Provider value={{ user, cookie, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
