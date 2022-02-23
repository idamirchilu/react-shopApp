import Card from "../UI/Card";
import classes from "./CartList.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  return (
    <Card className={classes.cart}>
      <ul>
        <CartItem />
      </ul>
    </Card>
  );
};

export default Cart;
