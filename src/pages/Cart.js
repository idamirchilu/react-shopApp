import CartList from "../components/Cart/CartList";
import NotLogin from "../components/Cart/NotLogin/NotLogin";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { sendUserData, fetchUserData } from "../store/auth-slice";

export default function Cart() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(sendUserData(state.usersData));
  }, [dispatch, state.usersData]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return <Fragment>{state.userIsLogin ? <CartList /> : <NotLogin />}</Fragment>;
}
