import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ApiError, SupabaseClient, User } from "@supabase/supabase-js";

import Header from "../components/features/Header";
import AddAlbumForm from "../components/features/AddAlbumForm";
import Button from "../components/core/Button";
import useProfile from "../hooks/useProfile";
import LoadingIcon from "../components/icons/LoadingIcon";
import CenteredFormContainer from "../components/core/CenteredFormContainer";

interface AlbumValues {
  name: string;
}

interface Album {
  name: string;
  created_at: Date;
  user_id: string;
  family_id: string;
}

interface Props {
  supabase: SupabaseClient;
  user: User;
}

const AddAlbum = ({ supabase, user }: Props): JSX.Element => {
  const defaultValues = {
    name: "",
  };

  const methods = useForm<AlbumValues>({ defaultValues });
  const navigate = useNavigate();
  const profile = useProfile(user?.id, supabase);
  const onSubmit = async (formData: AlbumValues) => {
    try {
      // insert the new album into the database with the current user id
      const { error } = await supabase.from<Album>("albums").insert([
        {
          name: formData.name,
          created_at: new Date(Date.now()),
          user_id: user?.id,
          family_id: profile?.family_id,
        },
      ]);
      if (error) throw error;

      // upon success navigate back to the home page
      navigate("/");
    } catch (err) {
      const error = err as ApiError;
      if (error.message === "JWT expired") {
        navigate("/auth/login");
      }
      console.trace(err);
    }
  };

  return (
    <>
      <Header title='Add Album' canGoBack />
      <CenteredFormContainer>
        <h1 className='mb-2 text-center text-lg font-bold'>Add Album</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AddAlbumForm />
            <Button
              variant='contained'
              type='submit'
              color='primary'
              size='medium'
              fullWidth>
              {methods.formState.isSubmitting ? <LoadingIcon /> : "Add Album"}
            </Button>
          </form>
        </FormProvider>
      </CenteredFormContainer>
    </>
  );
};

export default AddAlbum;
