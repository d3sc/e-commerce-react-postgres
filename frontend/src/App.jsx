import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Logout from "./pages/auth/Logout";
import Layout from "./components/dashboard/Layout";
import Cart from "./pages/Cart";
import Likes from "./pages/Likes";

function App() {
  const { cookie } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/dashboard" element={<Layout />}>
        <Route index Component={Dashboard} />
        <Route path="cart" element={<Cart />} />
        <Route path="likes" element={<Likes />} />
      </Route>

      {/* auth route */}
      <Route path="/register" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/logout" Component={Logout} />
    </Routes>
  );
}

export default App;
