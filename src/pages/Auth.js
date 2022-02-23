import RegisterFrom from "../components/Form/RegisterForm";
import LoginForm from "../components/Form/LoginForm";
import { useSelector } from "react-redux";

export default function Auth() {
  const state = useSelector((state) => state.auth);
  return <>{state.haveAnAccount ? <LoginForm /> : <RegisterFrom />}</>;
}
