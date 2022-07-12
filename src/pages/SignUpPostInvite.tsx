import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Input from "../components/core/Input";
import { useSupabase } from "../contexts/SupabaseContext";
import CenteredFormContainer from "../components/core/CenteredFormContainer";
import LoadingFormButton from "../components/core/LoadingformButton";

export default function SignUpPostInvite() {
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const defaultValues = { name: "", password: "" };
  const methods = useForm<FieldValues>({ defaultValues });

  async function onSubmit(formData: FieldValues) {
    try {
      // update the password for user
      const { error } = await supabase.auth.update({
        password: formData.password,
      });
      if (error) throw error;

      // insert a profile with the admin status, family id, and name
      const user = supabase.auth.user();
      const response = await supabase.from("profiles").insert([
        {
          id: user?.id,
          name: formData.name,
          isadmin: user?.user_metadata.isadmin,
          family_id: user?.user_metadata.familyId,
          updated_at: new Date(Date.now()),
        },
      ]);
      if (response.error) throw response.error;
      methods.reset();
      navigate("/", { replace: true });
    } catch (err) {
      console.trace(err);
    }
  }

  return (
    <CenteredFormContainer>
      <h1 className='mb-2 text-center text-lg font-bold'>
        Finish Creating Account
      </h1>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          type='text'
          name='name'
          labelText='Name'
          placeholder='Name'
          register={methods.register}
          error={methods.formState.errors.name}
          validationRules={{
            required: { value: true, message: "Name is required" },
          }}
        />
        <Input
          type='password'
          name='password'
          register={methods.register}
          labelText='Password'
          placeholder='Password'
          error={methods.formState.errors.password}
          validationRules={{
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters!",
            },
            validate: (password) => {
              const confirmPasswordValue =
                methods.getValues("confirm-password");
              if (confirmPasswordValue !== password) {
                return "Passwords do not match!";
              }
              return true;
            },
          }}
        />
        <Input
          type='password'
          name='confirm-password'
          register={methods.register}
          labelText='Confirm Password'
          placeholder='Confirm Password'
          error={methods.formState.errors["confirm-password"]}
          validationRules={{
            validate: {
              checkPasswordsMatch: (value) => {
                const passwordValue = methods.getValues("password");
                if (value !== passwordValue) {
                  return "Passwords do not match!";
                }
                return true;
              },
            },
          }}
        />
        <LoadingFormButton isLoading={methods.formState.isSubmitting}>
          Create Profile
        </LoadingFormButton>
      </form>
    </CenteredFormContainer>
  );
}
