import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { ApiError } from "@supabase/supabase-js";

import { SignUpFormState as FormState } from "../../types/forms";
import Button from "../../components/core/Button";
import LoadingIcon from "../../components/icons/LoadingIcon";
import SignUpForm from "../../components/features/SignUpForm";
import FormErrorText from "../../components/core/FormErrorText";
import "./sign-up.css";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = (): JSX.Element => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    familyName: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };
  const methods = useForm<FormState>({ defaultValues });
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormState> = async (formData: FormState) => {
    try {
      setLoading(true);
      await signUp(formData);
      setServerError(null);
      navigate("/");
    } catch (err) {
      const error = err as ApiError;
      setServerError(error.message ?? err);
      Sentry.captureMessage(error.message ?? err, Sentry.Severity.Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=' flex justify-center items-center py-2 h-screen'>
      <div className='bg-white shadow-xl rounded px-8 py-4 w-96'>
        <h1 className='mb-2 text-center text-lg font-bold'>
          Sign Up with Family Share
        </h1>
        {serverError && <FormErrorText text={serverError} showError />}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <SignUpForm />
            <Button
              variant='contained'
              type='submit'
              color='primary'
              size='medium'
              fullWidth>
              {loading ? <LoadingIcon /> : "Sign Up"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default SignUp;
