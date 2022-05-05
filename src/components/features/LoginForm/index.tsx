import { useFormContext } from "react-hook-form";
import LoginFormFields from "./LoginFormFields";

const LoginForm = () => {
  const methods = useFormContext();
  return <LoginFormFields {...methods} />;
};

export default LoginForm;
