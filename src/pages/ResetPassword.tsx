import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import CenteredFormContainer from "../components/core/CenteredFormContainer";
import Input from "../components/core/Input";
import Button from "../components/core/Button";
import { useSupabase } from "../contexts/SupabaseContext";
import LoadingIcon from "../components/icons/LoadingIcon";

export default function ResetPassword(): JSX.Element {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const defaultValues = { newPassword: "", confirmNewPassword: "" };
  const methods = useForm<FieldValues>({ defaultValues });
  const { supabase } = useSupabase();
  const navigate = useNavigate();

  async function onSubmit(formData: FieldValues) {
    if (accessToken === null) {
      throw new Error("Something has gone wrong in resetting password");
    }
    try {
      const { error } = await supabase.auth.api.updateUser(accessToken, {
        password: formData.newPasword,
      });
      if (error) throw error;
      navigate("/", { replace: true });
    } catch (err) {
      console.trace(err);
    }
  }

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.substring(0, 1) === "#") {
      const tokens = hash.substring(1).split("&");
      const entryPayload: any = {};
      tokens.map((token) => {
        const pair = (token + "=").split("=");
        entryPayload[pair[0]] = pair[1];
        if (entryPayload?.type === "recovery") {
          return `${entryPayload.accessToken}`;
        }
        return token;
      });
      setAccessToken(tokens[0].split("=")[1]);
    }
  }, []);

  return (
    <CenteredFormContainer>
      <h1 className='font-bold text-lg text-center mb-2'>
        Reset your password
      </h1>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          type='password'
          name='newPassword'
          labelText='New Password'
          placeholder='New Password'
          register={methods.register}
          error={methods.formState.errors.newPassword}
          validationRules={{
            required: { value: true, message: "New Password is required" },
            minLength: {
              value: 6,
              message: "New Password must contain at least 6 characters!",
            },
            validate: (value) => {
              const confirmNewPasswordValue =
                methods.getValues("confirmNewPassword");
              if (confirmNewPasswordValue !== value) {
                return "Passwords do not match!";
              }
              return true;
            },
          }}
        />
        <Input
          type='password'
          name='confirmNewPassword'
          labelText='Confirm New Password'
          placeholder='Confirm New Password'
          register={methods.register}
          error={methods.formState.errors.confirmNewPassword}
          validationRules={{
            validate: (value) => {
              const newPasswordValue = methods.getValues("newPassword");
              if (newPasswordValue !== value) {
                return "Passwords do not match";
              }
              return true;
            },
            required: {
              message: "Confirm New Password is required!",
              value: true,
            },
          }}
        />
        <Button type='submit' variant='contained' color='primary' fullWidth>
          {methods.formState.isSubmitting ? (
            <LoadingIcon size='small' color='white' />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </CenteredFormContainer>
  );
}
