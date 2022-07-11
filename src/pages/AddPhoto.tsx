import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SupabaseClient, User } from "@supabase/supabase-js";

import AddPhotoForm from "../components/features/AddPhotoForm";
import Header from "../components/features/Header";
import Button from "../components/core/Button";
import LoadingIcon from "../components/icons/LoadingIcon";
import { Album } from "../types/resources";
import { AddPhotoFormState } from "../types/forms";
import useProfile from "../hooks/useProfile";
import useSupabaseStorage from "../hooks/useSupabaseStorage";
import CenteredFormContainer from "../components/core/CenteredFormContainer";

interface Props {
  supabase: SupabaseClient;
  user: User;
}

const AddPhoto = ({ user, supabase }: Props): JSX.Element => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const { fetchBucket, uploadPhoto, fetchSignedUrl, createPhoto } =
    useSupabaseStorage(supabase);
  const profile = useProfile(user?.id, supabase);
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
        await uploadPhoto("photos", photoFile);
      if (uploadedPhotoError || uploadedPhoto === null)
        throw uploadedPhotoError;

      const { signedURL, error: urlError } = await fetchSignedUrl(
        "photos",
        uploadedPhoto.Key.split("/")[1]
      );

      if (urlError || signedURL === null) throw urlError;

      const { error: photoError } = await createPhoto({
        title: formData.title,
        description: formData.description,
        user_id: user?.id,
        album_id: formData.album.id,
        path: signedURL,
      });
      if (photoError) throw photoError;
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

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
      <CenteredFormContainer>
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
      </CenteredFormContainer>
    </>
  );
};

export default AddPhoto;
