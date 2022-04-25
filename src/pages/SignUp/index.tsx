import { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";

import { useSupabase } from "../../contexts/SupabaseContext";
import { AuthenticationService } from "../../services/Authentication.service";
import { FamilyService } from "../../services/Family.service";
import { UserService } from "../../services/User.service";
import { SignUpFormState as FormState } from "../../types/forms";
import { Family } from "../../types/resources";
import Button from "../../components/core/Button";
import SignUpForm from "../../components/features/SignUpForm";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import FormErrorText from "../../components/core/FormErrorText";
import "./sign-up.css";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = (): JSX.Element => {
  const [serverError, setServerError] = useState<string | null>(null);
  const methods = useForm<FormState>();
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const navigate = useNavigate();
  const authenticationService = new AuthenticationService(supabase);
  const familyService = new FamilyService(supabase);
  const userService = new UserService(supabase);

  const onSubmit: SubmitHandler<FormState> = async (formData: FormState) => {
    // register user
    const signUpUser = authenticationService.signUp(
      formData.email,
      formData.password
    );

    // create a new family
    const createFamily: PostgrestFilterBuilder<Family> = familyService.create(
      formData.familyName
    );

    const [user, family] = await Promise.all([signUpUser, createFamily]);
    if (user.error) {
      setServerError(user.error.message);

      Sentry.captureMessage(user.error.message, Sentry.Severity.Error);
      return;
    }
    if (family.error) {
      setServerError(family.error.message);

      Sentry.captureMessage(family.error.message, Sentry.Severity.Error);
      return;
    }

    // set up user profile
    const createUserProfile = await userService.create(
      user.user?.id ?? "",
      formData.name,
      family.data[0].id
    );

    if (createUserProfile.error) {
      setServerError(createUserProfile.error.message);

      Sentry.captureMessage(
        createUserProfile.error.message,
        Sentry.Severity.Error
      );
      return;
    }

    navigate("/");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
              Sign Up
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default SignUp;
