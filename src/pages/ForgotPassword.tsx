import { useForm, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

import CenteredFormContainer from "../components/core/CenteredFormContainer";
import Input from "../components/core/Input";
import Button from "../components/core/Button";
import { useSupabase } from "../contexts/SupabaseContext";
import LoadingIcon from "../components/icons/LoadingIcon";

export default function ForgotPassword() {
  const defaultValues = { email: "" };
  const methods = useForm<FieldValues>({ defaultValues });
  const { supabase } = useSupabase();

  function notify() {
    toast.success("Please check your email to reset your password");
  }

  async function onSubmit(formData: FieldValues) {
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(
        formData.email,
        {
          redirectTo:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/auth/reset-password"
              : "",
        }
      );
      if (error) throw error;
      notify();
    } catch (err) {
      console.trace(err);
    }
  }

  return (
    <CenteredFormContainer>
      <h1 className='font-bold mb-2 text-sm text-center'>
        Reset your password
      </h1>
      <p className='mb-10 text-center text-black opacity-80'>
        Enter your email and we'll send you a link to rest your password.
      </p>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          type='email'
          name='email'
          labelText='Email'
          placeholder='Email'
          register={methods.register}
          error={methods.formState.errors.email}
          validationRules={{
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email is invalid!",
            },
          }}
        />
        <Button type='submit' variant='contained' color='primary' fullWidth>
          {methods.formState.isSubmitting ? (
            <LoadingIcon size='small' color='white' />
          ) : (
            "Reset your password"
          )}
        </Button>
      </form>
    </CenteredFormContainer>
  );
}
