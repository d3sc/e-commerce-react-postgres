import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Logout from "./pages/auth/Logout";

function App() {
  const { cookie } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" Component={Home} />

      {/* auth route */}
      <Route path="/register" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="/logout" Component={Logout} />
    </Routes>
  );
}

export default App;
