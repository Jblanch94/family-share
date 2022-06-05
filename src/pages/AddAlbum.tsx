import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ApiError } from "@supabase/supabase-js";

import Header from "../components/features/Header";
import AddAlbumForm from "../components/features/AddAlbumForm";
import Button from "../components/core/Button";
import { useSupabase } from "../contexts/SupabaseContext";
import { useAuth } from "../contexts/AuthContext";
import LoadingIcon from "../components/icons/LoadingIcon";

interface AlbumValues {
  name: string;
}

interface Album {
  name: string;
  created_at: Date;
  user_id: string;
  family_id: string;
}

const AddAlbum = () => {
  const [familyId, setFamilyId] = useState<string | undefined>(undefined);
  const defaultValues = {
    name: "",
  };

  const methods = useForm<AlbumValues>({ defaultValues });
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const onSubmit = async (formData: AlbumValues) => {
    try {
      // insert the new album into the database with the current user id
      const { error } = await supabase.from<Album>("albums").insert([
        {
          name: formData.name,
          created_at: new Date(Date.now()),
          user_id: user?.id,
          family_id: familyId,
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
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchFamily = async () => {
      if (!user || !user.id) throw new Error("User is not logged in!");
      const { data, error } = await supabase
        .from("profiles")
        .select(`family_id`)
        .eq("id", user?.id);
      if (error) throw error;

      console.log("test data", data);

      setFamilyId(data[0].family_id);
    };

    fetchFamily();
  }, [supabase, user]);

  return (
    <>
      <Header title='Add Album' canGoBack />
      <section className='flex justify-center items-center py-2 h-screen'>
        <div className='bg-white shadow-xl rounded px-8 py-4 w-96'>
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
        </div>
      </section>
    </>
  );
};

export default AddAlbum;
