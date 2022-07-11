import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

import LoginForm from "../components/features/LoginForm";
import FormErrorText from "../components/core/FormErrorText";
import Button from "../components/core/Button";
import LoadingIcon from "../components/icons/LoadingIcon";
import Link from "../components/core/Link";
import { useAuth } from "../contexts/AuthContext";
import { ApiError } from "@supabase/supabase-js";
import CenteredFormContainer from "../components/core/CenteredFormContainer";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const { error } = await signin(data.email, data.password);
      if (error) throw error;

      setServerError(null);
      navigate(from, { replace: true });
    } catch (err) {
      const error = err as ApiError;
      setServerError(error.message);
      setUser(null);
    } finally {
      setLoading(false);
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
          <Button
            variant='contained'
            type='submit'
            color='primary'
            size='medium'
            fullWidth>
            {loading ? <LoadingIcon color='white' size='small' /> : "Login"}
          </Button>
        </form>
      </FormProvider>
      <div className='mt-2'>
        <span>Don't have an account? </span>
        <Link
          to='/auth/sign-up'
          className='!text-base text-blue-600 hover:opacity-80'>
          Sign Up
        </Link>
      </div>
    </CenteredFormContainer>
  );
};

export default Login;
