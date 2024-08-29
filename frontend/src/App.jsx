import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/auth/Logout";
import Layout from "./components/dashboard/Layout";
import Cart from "./pages/Cart";
import Likes from "./pages/Likes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route index Component={Home} />

      {/* <Route path="/dashboard" element={<Layout />}>
        <Route index Component={Dashboard} />
        <Route path="cart" element={<Cart />} />
        <Route path="likes" element={<Likes />} />
      </Route> */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/dashboard/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      <Route
        path="/dashboard/likes"
        element={
          <Layout>
            <Likes />
          </Layout>
        }
      />

      {/* auth route */}
      <Route path="/register" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/logout" Component={Logout} />

      <Route path="*" Component={NotFound} />
    </Routes>
  );
}

export default App;
