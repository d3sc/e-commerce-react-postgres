import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default Option = {
  isGuest: () => {
    const navigate = useNavigate();
    const { cookie, user } = useContext(AuthContext);
    useEffect(() => {
      if (!cookie && !user) navigate("/login");
    }, [cookie, user]);
  },
  isAuth: () => {
    const navigate = useNavigate();
    const { cookie, user } = useContext(AuthContext);
    useEffect(() => {
      if (cookie && user) navigate("/dashboard");
    }, [cookie, user]);
  },
};
