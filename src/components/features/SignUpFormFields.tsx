import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
  FormState,
} from "react-hook-form";

import Input from "../core/Input";

interface Methods {
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  formState: FormState<FieldValues>;
}

const SignUpFormFields = ({ register, getValues, formState }: Methods) => {
  return (
    <>
      <Input
        name='familyName'
        register={register}
        labelText='Family Name'
        placeholder='Family Name'
        type='text'
        validationRules={{
          required: { value: true, message: "Family Name is required" },
        }}
        error={formState.errors.familyName}
      />
      <Input
        name='email'
        register={register}
        labelText='Email'
        placeholder='Email'
        type='text'
        validationRules={{
          required: { value: true, message: "Email is required" },
          pattern: {
            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: "Email is invalid!",
          },
        }}
        error={formState.errors.email}
      />
      <Input
        name='name'
        register={register}
        labelText='Name'
        placeholder='Name'
        type='text'
        validationRules={{
          required: { value: true, message: "Name is required" },
        }}
        error={formState.errors.name}
      />
      <Input
        name='password'
        register={register}
        labelText='Password'
        placeholder='Password'
        type='password'
        validationRules={{
          required: { value: true, message: "Password is required" },
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters!",
          },
          validate: (password) => {
            const confirmPasswordValue = getValues("confirmPassword");
            if (confirmPasswordValue !== password) {
              return "Passwords do not match!";
            }
            return true;
          },
        }}
        error={formState.errors.password}
      />
      <Input
        name='confirmPassword'
        register={register}
        labelText='Confirm Password'
        placeholder='Confirm Password'
        type='password'
        validationRules={{
          required: {
            value: true,
            message: "Password Confirmation is required!",
          },
          validate: {
            checkPasswordsMatch: (value) => {
              const passwordValue = getValues("password");
              if (passwordValue !== value) {
                return "Passwords do not match!";
              }

              return true;
            },
          },
        }}
        error={formState.errors.confirmPassword}
      />
    </>
  );
};

export default SignUpFormFields;
