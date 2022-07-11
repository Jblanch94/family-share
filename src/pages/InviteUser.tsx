import { useForm, FieldValues, Controller } from "react-hook-form";
import { Switch } from "@headlessui/react";
import { User, SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import Header from "../components/features/Header";
import Input from "../components/core/Input";
import Button from "../components/core/Button";
import LoadingIcon from "../components/icons/LoadingIcon";
import { supabaseAdmin } from "../config/supabaseAdmin";
import useProfile from "../hooks/useProfile";

interface Props {
  user: User;
  supabase: SupabaseClient;
}

export default function InviteUser({ user, supabase }: Props): JSX.Element {
  const defaultValues = { name: "", isadmin: false };
  const methods = useForm<FieldValues>({ defaultValues });

  const uniqueToastId = uuidv4();
  const notify = (message: string, status: "success" | "error") => {
    if (status === "success") {
      toast.success(message, {
        toastId: uniqueToastId,
        delay: 500,
      });
    } else {
      toast.error(message, { toastId: uniqueToastId, delay: 500 });
    }
  };
  const profile = useProfile(user?.id, supabase);

  async function onSubmit(formData: FieldValues) {
    try {
      const { error } = await supabaseAdmin.auth.api.inviteUserByEmail(
        formData.email,
        {
          redirectTo:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/settings/invite/sign-up"
              : "",
          data: { isadmin: formData.isadmin, familyId: profile?.family_id },
        }
      );
      if (error) throw error;
      notify("Successfully invited member to Family Share!", "success");
    } catch (err) {
      console.error(err);
      const error = err as PostgrestError;
      if (
        error.message ===
        "A user with this email address has already been registered"
      ) {
        notify(error.message, "error");
      }
    }
  }

  return (
    <>
      <Header title='Invite Family Member' canGoBack />
      <section className='mt-4 mx-6'>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex flex-col space-y-4'>
          <Input
            register={methods.register}
            type='email'
            name='email'
            labelText='Email'
            placeholder='Email'
            validationRules={{
              required: { value: true, message: "Name is required" },
            }}
            error={methods.formState.errors.name}
          />
          <div className='flex items-center space-x-2'>
            <Controller
              control={methods.control}
              name='isadmin'
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <Switch
                  name={name}
                  onBlur={onBlur}
                  checked={value}
                  onChange={onChange}
                  ref={ref}
                  className={`${
                    !value ? "bg-gray" : "bg-blue-500"
                  } relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                  <span className='sr-only'>Use setting</span>
                  <span
                    aria-hidden='true'
                    className={`${value ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}></span>
                </Switch>
              )}></Controller>
            <span>Admin</span>
          </div>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            classes='text-xl sm:text-2xl'>
            {methods.formState.isSubmitting ? (
              <LoadingIcon size='small' color='white' />
            ) : (
              "Invite User"
            )}
          </Button>
        </form>
      </section>
    </>
  );
}
