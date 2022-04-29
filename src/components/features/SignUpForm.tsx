import { useFormContext } from "react-hook-form";

import SignUpFormFields from "./SignUpFormFields";

const SignUpForm = () => {
  const methods = useFormContext();
  return <SignUpFormFields {...methods} />;
};

export default SignUpForm;
