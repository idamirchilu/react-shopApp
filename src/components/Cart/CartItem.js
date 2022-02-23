import classes from "./CartItem.module.css";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { sendCartData } from "../../store/cart-slice";
import { fetchCartData } from "../../store/cart-slice";

const CartItem = () => {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendCartData(cartState.cartItems));
  }, [cartState.cartItems, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  if (cartState.cartItems.length === 0) {
    return (
      <section>
        {/* <h1>{`Hello ${
          state.usersData[state.usersData.length - 1]["fName"]
        }`}</h1> */}
        <h2>There is NO Items</h2>
      </section>
    );
  }

  return (
    <Fragment>
      {/* {state.usersData.length > 0 && (
        <h1>{`Hello ${
          state.usersData[state.usersData.length - 1]["fName"]
        }`}</h1>
      )} */}
      {cartState.cartItems.map((item) => {
        return (
          <>
            <h2>Your Shopping Cart</h2>
            <li key={item.id} className={classes.item}>
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
            </li>
          </>
        );
      })}
    </Fragment>
  );
};

export default CartItem;
