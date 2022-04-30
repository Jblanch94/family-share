import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/features/LoginForm";
import FormErrorText from "../components/core/FormErrorText";
import Button from "../components/core/Button";
import LoadingIcon from "../components/icons/LoadingIcon";
import Link from "../components/core/Link";
import { useAuth } from "../contexts/AuthContext";
import { ApiError } from "@supabase/supabase-js";

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

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      const { error } = await signin(data.email, data.password);
      if (error) {
        throw error;
      }
      setServerError(null);
      navigate("/");
    } catch (err) {
      const error = err as ApiError;
      setServerError(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=' flex justify-center items-center py-2 h-screen'>
      <div className='bg-white shadow-xl rounded px-8 py-4 w-96'>
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
              {loading ? <LoadingIcon /> : "Login"}
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
      </div>
    </section>
  );
};

export default Login;
