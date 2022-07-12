import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

import LoginForm from "../components/features/LoginForm";
import FormErrorText from "../components/core/FormErrorText";
import Link from "../components/core/Link";
import { useAuth } from "../contexts/AuthContext";
import { ApiError } from "@supabase/supabase-js";
import CenteredFormContainer from "../components/core/CenteredFormContainer";
import LoadingFormButton from "../components/core/LoadingformButton";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const [serverError, setServerError] = useState<string | null>(null);
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm<LoginFormValues>({ defaultValues });
  const { signin, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let from = useMemo(() => {
    const state = location.state as { from: Location };

    if (state && state.from) {
      return state.from;
    }

    return "/";
  }, [location.state]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { error } = await signin(data.email, data.password);
      if (error) throw error;

      setServerError(null);
      navigate(from, { replace: true });
    } catch (err) {
      const error = err as ApiError;
      setServerError(error.message);
      setUser(null);
    }
  };

  return (
    <CenteredFormContainer>
      <h1 className='mb-2 text-center text-lg font-bold'>
        Login with Family Share
      </h1>
      {serverError && <FormErrorText text={serverError} showError />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <LoginForm />
          <LoadingFormButton isLoading={methods.formState.isSubmitting}>
            Login
          </LoadingFormButton>
        </form>
      </FormProvider>
      <div className='mt-2'>
        <span>Don't have an account? </span>
        <Link
          to='/auth/sign-up'
          className='!text-base text-blue-600 hover:opacity-80'>
          Sign Up
        </Link>
        <Link
          to='/auth/forgot-password'
          className='!text-base hover:opacity-80 text-orange-500 block mt-2'>
          Forgot password?
        </Link>
      </div>
    </CenteredFormContainer>
  );
};

export default Login;
