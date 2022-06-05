import { HTMLInputTypeAttribute } from "react";
import {
  FieldValues,
  UseFormRegister,
  RegisterOptions,
  FieldError,
} from "react-hook-form";

import FormErrorText from "./FormErrorText";

interface InputProps {
  labelText: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  validationRules?: RegisterOptions;
  error?: FieldError | undefined;
  showLabel?: boolean;
}

const Input = ({
  register,
  labelText,
  name,
  validationRules = {},
  error = undefined,
  showLabel = true,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <div className='mb-2'>
      <label
        htmlFor={name}
        className='block text-gray-700 text-sm font-bold mb-1'
        aria-label={showLabel ? "" : labelText}>
        {showLabel ? labelText : null}
      </label>
      <input
        id={name}
        aria-invalid={error ? "true" : "false"}
        {...rest}
        {...register(name, validationRules)}
        className={`shadow appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-blue-300 ${
          error ? "border-red-500 border-2 focus:outline-red-500" : undefined
        }`}
      />
      <FormErrorText showError={error !== undefined} text={error?.message} />
    </div>
  );
};

export default Input;
