import { useFormContext } from "react-hook-form";

interface FormProps {
  children: any;
}

const Form = ({ children }: FormProps): JSX.Element => {
  const methods = useFormContext();

  return children({ ...methods });
};

export default Form;
