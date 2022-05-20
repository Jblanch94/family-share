import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlbumsListItem from "./AlbumsListItem";
import { useSupabase } from "../../../contexts/SupabaseContext";
import { useAuth } from "../../../contexts/AuthContext";
import { Album } from "../../../types/resources";

interface Profile {
  family_id: string;
}

const AlbumsList = () => {
  const [albums, setAlbums] = useState<Album[] | null>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const { user } = useAuth();

  const fetchProfile = useCallback(async () => {
    if (!user || !user.id) {
      return navigate("/auth/login", { replace: true });
    }
    const { data, error } = await supabase
      .from("profiles")
      .select(`id, name, family_id`)
      .eq("id", user.id);
    if (error) throw error;
    setProfile(data[0]);
  }, [supabase, user, navigate]);

  const fetchAlbums = useCallback(async () => {
    if (!profile || !profile.family_id)
      return navigate("/auth/login", { replace: true });
    const { data, error } = await supabase
      .from<Album>("albums")
      .select(`id, name, created_at`)
      .eq("family_id", profile.family_id);
    if (error) throw error;
    setAlbums(data);
  }, [supabase, profile, navigate]);

  useEffect(() => {
    fetchProfile();
    if (profile?.family_id) {
      fetchAlbums();
    }
  }, [fetchAlbums, fetchProfile, user, profile]);

  if (albums && !albums.length) {
    return <div>No Albums</div>;
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-2 mx-2'>
        {albums?.map((album) => {
          return (
            <AlbumsListItem key={album.id} name={album.name} numPhotos={5} />
          );
        })}
      </div>
    </>
  );
};

export default AlbumsList;
