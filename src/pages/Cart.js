import CartList from "../components/Cart/CartList";
import NotLogin from "../components/Cart/NotLogin/NotLogin";
import { useSelector } from "react-redux";
import { Fragment } from "react";

export default function Cart() {
  const state = useSelector((state) => state.auth);

  return <Fragment>{state.isLoggedIn ? <CartList /> : <NotLogin />}</Fragment>;
}
