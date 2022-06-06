import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/features/Header";
import AlbumPhotosList from "../components/features/Album/AlbumPhotosList";
import { useSupabase } from "../contexts/SupabaseContext";
import { Photo } from "../types/resources";

const Album = (): JSX.Element => {
  const [albumName, setAlbumName] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { id } = useParams();
  const { supabase } = useSupabase();

  // fetch the album with id from the params
  useEffect(() => {
    const fetchAlbum = async () => {
      const { data, error } = await supabase
        .from("albums")
        .select("id, name, created_at")
        .eq("id", id);
      if (error) throw error;
      setAlbumName(data[0].name);
    };
    fetchAlbum();
  }, [supabase, id]);

  // fetch all the photos associated with the album
  useEffect(() => {
    const fetchPhotos = async () => {
      if (!id) throw new Error("Can not find Album");
      const { data, error } = await supabase
        .from<Photo>("photos")
        .select("id, path, title, description, album_id")
        .eq("album_id", id);
      if (error) throw error;
      setPhotos(data);
    };
    fetchPhotos();
  }, [supabase, id]);

  return (
    <>
      <Header title={albumName} canGoBack />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-2 mx-2 mt-2'>
        <AlbumPhotosList photos={photos} />
      </div>
    </>
  );
};

export default Album;
