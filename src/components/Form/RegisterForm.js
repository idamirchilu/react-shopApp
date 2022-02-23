import classes from "./RegisterForm.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const fNameInputRef = useRef();
  const lNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const ageInputRef = useRef();
  const countryInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const userData = {
      fName: fNameInputRef.current.value,
      lName: lNameInputRef.current.value,
      email: emailInputRef.current.value,
      password: +passwordInputRef.current.value,
      age: +ageInputRef.current.value,
      country: countryInputRef.current.value,
    };
    console.log(userData);
    dispatch(authActions.register(userData));
    navigate("/cart");
    fNameInputRef.current.value = "";
    lNameInputRef.current.value = "";
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    ageInputRef.current.value = "";
    countryInputRef.current.value = "";
  };

  return (
    <div className={classes.container}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.row}>
          <div className={classes["col-25"]}>
            <label htmlFor="fname">Frist Name</label>
          </div>
          <div className={classes["col-75"]}>
            <input
              ref={fNameInputRef}
              name="fname"
              type="text"
              placeholder="your frist name..."
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes["col-25"]}>
            <label htmlFor="lname">Last Name</label>
          </div>
          <div className={classes["col-75"]}>
            <input
              ref={lNameInputRef}
              name="lname"
              type="text"
              placeholder="your last name..."
            />
          </div>
        </div>

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

        <div className={classes.row}>
          <div className={classes["col-25"]}>
            <label htmlFor="age">Age</label>
          </div>
          <div className={classes["col-75"]}>
            <input
              ref={ageInputRef}
              name="age"
              type="number"
              min="15"
              max="70"
              placeholder="age"
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes["col-25"]}>
            <label htmlFor="country">Country</label>
          </div>
          <div className={classes["col-75"]}>
            <select
              ref={countryInputRef}
              name="country"
              placeholder="your country..."
            >
              <option value="Iran">Iran</option>
              <option value="USA">USA</option>
              <option value="Mexico">Mexico</option>
            </select>
          </div>

          <br />
          <div className={classes.row}>
            <button type="submit">Submit</button>
          </div>
          <button onClick={() => dispatch(authActions.toggleForm())}>
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  );
}
