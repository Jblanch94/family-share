import { UseFormRegister, FieldValues } from "react-hook-form";

import Input from "../../core/Input";

interface Methods {
  register: UseFormRegister<FieldValues>;
}

const LoginFormFields = ({ register }: Methods): JSX.Element => {
  return (
    <>
      <Input
        name='email'
        type='email'
        placeholder='Email'
        labelText='Email'
        register={register}
      />
      <Input
        name='password'
        type='password'
        placeholder='Password'
        labelText='Password'
        register={register}
      />
    </>
  );
};

export default LoginFormFields;
