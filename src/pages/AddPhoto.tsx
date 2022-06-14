import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AddPhotoForm from "../components/features/AddPhotoForm";
import Header from "../components/features/Header";
import Button from "../components/core/Button";
import LoadingIcon from "../components/icons/LoadingIcon";
import { AddPhotoFormState } from "../types/forms";
import { useSupabase } from "../contexts/SupabaseContext";
import { useAuth } from "../contexts/AuthContext";
import useSupabaseStorage from "../hooks/useSupabaseStorage";
import { Profile, Album } from "../types/resources";

const AddPhoto = (): JSX.Element => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const { fetchBucket, uploadPhoto, fetchPublicUrl, createPhoto } =
    useSupabaseStorage(supabase);
  const methods = useForm<AddPhotoFormState>();
  const navigate = useNavigate();

  if (user === null) throw new Error("User not logged in");

  const onSubmit = async (formData: AddPhotoFormState) => {
    try {
      // insert photo into bucket and get back the path to the image
      const bucket = "photos";
      const { data, error: storageError } = await fetchBucket(bucket);
      if (storageError || data === null) throw storageError;

      const photoFile = formData.photo[0];
      const { data: uploadedPhoto, error: uploadedPhotoError } =
        await uploadPhoto(data.id, photoFile);
      if (uploadedPhotoError || uploadedPhoto === null)
        throw uploadedPhotoError;
      const { data: urlData, error: urlError } = fetchPublicUrl(
        data.id,
        uploadedPhoto.Key
      );
      if (urlError || urlData === null) throw urlError;

      const { error: photoError } = await createPhoto({
        title: formData.title,
        description: formData.description,
        user_id: user?.id,
        album_id: formData.album.id,
        path: urlData.publicURL,
      });
      if (photoError) throw photoError;
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  // fetch family id with the id of the current user
  useEffect(() => {
    if (!user) throw new Error("User not logged in");
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from<Profile>("profiles")
        .select(`id, name, family_id`)
        .eq("id", user?.id);
      if (error) throw error;
      setProfile(data[0]);
    };

    fetchProfile();
  }, [supabase, user]);

  useEffect(() => {
    const fetchAlbumsByFamilyId = async () => {
      if (profile === null) throw new Error("Profile is null");
      const { data, error } = await supabase
        .from<Album>("albums")
        .select("id, name")
        .eq("family_id", profile.family_id);
      if (error) throw error;
      setAlbums(data);
    };

    if (profile && profile.family_id) fetchAlbumsByFamilyId();
  }, [supabase, profile]);

  return (
    <>
      <Header title='Add Photo' />
      <section className='flex justify-center items-center py-2 h-screen'>
        <div className='bg-white shadow-xl rounded px-8 py-4 w-96'>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <AddPhotoForm albums={albums} />
              <Button
                variant='contained'
                type='submit'
                color='primary'
                size='medium'
                fullWidth>
                {methods.formState.isSubmitting ? <LoadingIcon /> : "Add Photo"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
};

export default AddPhoto;
