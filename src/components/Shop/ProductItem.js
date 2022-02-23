import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { sendCartData } from "../../store/cart-slice";
import { fetchCartData } from "../../store/cart-slice";

const ProductItem = ({ productData }) => {
  const authState = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendCartData(cartState.cartItems));
  }, [cartState.cartItems, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Fragment>
      {productData.map((item) => {
        return (
          <li key={item.id} className={classes.item}>
            <Card>
              <header>
                <h3>{item.title}</h3>
                <div className={classes.price}>${item.price.toFixed(2)}</div>
              </header>
              <p>{item.description}</p>
              <div className={classes.actions}>
                <button
                  onClick={() => {
                    if (!authState.userIsLogin) {
                      alert("Please Frist Login");
                      return;
                    }
                    dispatch(
                      cartActions.addItem({
                        price: item.price,
                        quantity: 1,
                        id: item.id,
                        title: item.title,
                      })
                    );
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </Card>
          </li>
        );
      })}
    </Fragment>
  );
};

export default ProductItem;
