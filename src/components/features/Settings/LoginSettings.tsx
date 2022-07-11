import { Fragment, useState } from "react";
import { ApiError, SupabaseClient } from "@supabase/supabase-js";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../../core/Button";

import Input from "../../core/Input";
import LoadingIcon from "../../icons/LoadingIcon";
import FormErrorText from "../../core/FormErrorText";

interface Props {
  email: string | undefined;
  supabase: SupabaseClient;
  user_id: string;
}

interface FormState {
  email: string;
}

export default function LoginSettings({
  email,
  supabase,
  user_id,
}: Props): JSX.Element {
  const [serverError, setServerError] = useState<string | null>(null);
  const initialValues: FormState = { email: email ?? "" };
  const methods = useForm<FieldValues>({ defaultValues: initialValues });

  async function onSubmit(formData: FieldValues) {
    try {
      const { error } = await supabase.auth.update({
        email: formData.email,
      });
      if (error) throw error;
    } catch (err) {
      const error = err as ApiError;
      if (
        error.message ===
        "A user with this email address has already been registered"
      ) {
        setServerError(error.message);
      }
      console.trace(err);
    }
  }
  return (
    <Fragment>
      <section className='my-4 sm:px-6 px-2'>
        {serverError && <FormErrorText text={serverError} showError />}
        <h4 className='text-xl sm:text-lg'>Login Settings</h4>
        <form className='mt-2' onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name='email'
            register={methods.register}
            type='text'
            placeholder='Email'
            error={methods.formState.errors.email}
            labelText='Email'
            validationRules={{
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email is invalid!",
              },
            }}
          />
          <Button
            variant='contained'
            size='medium'
            type='submit'
            classes='mt-2'>
            {methods.formState.isSubmitting ? (
              <LoadingIcon color='white' size='small' />
            ) : (
              "Change Email"
            )}
          </Button>
        </form>
      </section>
    </Fragment>
  );
}
