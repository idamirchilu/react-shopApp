import Layout from "./components/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-slice";
import { useEffect } from "react";

function App() {
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(sendCartData(cartState.cartItems, authState.email));
    }
  }, [cartState.cartItems, authState.email, dispatch, authState.isLoggedIn]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(fetchCartData(authState.email));
    }
  }, [dispatch, authState.email, authState.isLoggedIn]);

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
