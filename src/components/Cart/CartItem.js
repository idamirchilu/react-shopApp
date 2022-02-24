import classes from "./CartItem.module.css";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useSelector, useDispatch } from "react-redux";

const CartItem = () => {
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(sendCartData(cartState.cartItems));
  // }, [cartState.cartItems, dispatch]);

  // useEffect(() => {
  //   dispatch(fetchCartData());
  // }, [dispatch]);

  if (cartState.cartItems.length === 0) {
    return (
      <div className="container">
        <h2>There is NO Items</h2>
      </div>
    );
  }

  return (
    <li className={classes.item}>
      <h2>Cart of {authState.email}</h2>
      {cartState.cartItems.map((item) => {
        return (
          <div className={classes.container} key={item.id}>
            <header>
              <h3>{item.title}</h3>
              <div className={classes.price}>
                ${(item.price * item.quantity).toFixed(2)}{" "}
                <span className={classes.itemprice}>
                  (${item.price.toFixed(2)}/item)
                </span>
              </div>
            </header>
            <div className={classes.details}>
              <div className={classes.quantity}>
                x <span>{item.quantity}</span>
              </div>
              <div className={classes.actions}>
                <button
                  onClick={() => dispatch(cartActions.removeItem(item.id))}
                >
                  -
                </button>
                <button
                  onClick={() => dispatch(cartActions.increaseItem(item.id))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </li>
  );
};

export default CartItem;
