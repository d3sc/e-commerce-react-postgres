import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/auth/Logout";
import Layout from "./components/dashboard/Layout";
import Cart from "./pages/Cart";
import Likes from "./pages/Likes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AllProducts from "./pages/products/AllProducts";
import AllUsers from "./pages/users/AllUsers";
import Product from "./pages/products/Product";
import CreateProduct from "./pages/products/CreateProduct";

function App() {
  return (
    <Routes>
      <Route index Component={Home} />
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

      {/* admin base */}
      <Route
        path="/dashboard/products"
        element={
          <Layout>
            <AllProducts />
          </Layout>
        }
      />
      <Route
        path="/dashboard/create/product"
        element={
          <Layout>
            <CreateProduct />
          </Layout>
        }
      />
      <Route
        path="/dashboard/product/:id"
        element={
          <Layout>
            <Product />
          </Layout>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <Layout>
            <AllUsers />
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
