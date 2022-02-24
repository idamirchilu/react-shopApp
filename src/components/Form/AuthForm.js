import classes from "./AuthForm.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

export default function Form() {
  const dispatch = useDispatch();
  //const authState = useSelector((state) => state.auth);

  const [haveAccount, setHaveAccount] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const passwordIsValid = enteredPassword.length >= 7;

    if (!passwordIsValid) {
      alert("password must have 7 character");
      passwordInputRef.current.value = "";
      return;
    }

    let url;

    if (haveAccount) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbptS6AtWknN_eeGSqdzKj79Pa2PXwJ5k";
      (async () => {
        try {
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error.message);
          }

          dispatch(
            authActions.login({ token: data.idToken, email: data.email })
          );
        } catch (err) {
          alert(err.message);
        }
      })();
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbptS6AtWknN_eeGSqdzKj79Pa2PXwJ5k";
      (async () => {
        try {
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error.message);
          }

          dispatch(
            authActions.login({ token: data.idToken, email: data.email })
          );
        } catch (err) {
          alert(err.message);
        }
      })();
    }

    navigate("/cart");
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <div className={classes.container}>
      <form onSubmit={formSubmitHandler}>
        <h2>{haveAccount ? "Sign in" : "Sign up"}</h2>
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
              required
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
              required
            />
          </div>
        </div>

        <br />
        <div className={classes.row}>
          <button type="submit">Submit</button>
        </div>
      </form>
      <button onClick={() => setHaveAccount((prev) => !prev)}>
        {haveAccount ? "Dont't have Account?" : "Already have an account?"}
      </button>
    </div>
  );
}
