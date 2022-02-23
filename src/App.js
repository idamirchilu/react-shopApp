import Layout from "./components/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/shop" />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
        <Route path="auth" element={<Auth />} />
      </Routes>
    </Layout>
  );
}

export default App;
