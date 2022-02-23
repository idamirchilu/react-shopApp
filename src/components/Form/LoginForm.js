import classes from "./LoginForm.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

export default function LoginForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitFormHandler = (e) => {
    e.preventDefault();
    const data = {
      email: emailInputRef.current.value,
      password: +passwordInputRef.current.value,
    };
    dispatch(authActions.login(data));
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    navigate("/cart");
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <div className={classes.row}>
          <div className={classes["col-25"]}>
            <label htmlFor="email">Email</label>
          </div>
          <div className={classes["col-75"]}>
            <input
              ref={emailInputRef}
              name="email"
              type="email"
              placeholder="your Email address..."
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes["col-25"]}>
            <label htmlFor="pass">password</label>
          </div>
          <div className={classes["col-75"]}>
            <input
              ref={passwordInputRef}
              name="pass"
              type="password"
              placeholder="your Password..."
            />
          </div>
        </div>
        <br />
        <div className={classes.row}>
          <button type="submit">Submit</button>
        </div>
        <button onClick={() => dispatch(authActions.toggleForm())}>
          Don't have an account?
        </button>
      </form>
    </div>
  );
}
