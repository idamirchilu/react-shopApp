import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const state = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.cart);
  const totalQuantity = cartState.cartItems
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/shop");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart">
              Cart<span>{state.isLoggedIn && totalQuantity}</span>
            </Link>
          </li>
          {!state.isLoggedIn && (
            <li>
              <Link to="/auth">Login/register</Link>
            </li>
          )}
          <li>
            {state.isLoggedIn && (
              <button onClick={logoutHandler}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
