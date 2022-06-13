import { SupabaseClient } from "@supabase/supabase-js";
import { Photo } from "../types/resources";

const useSupabaseStorage = (supabase: SupabaseClient) => {
  function fetchBucket(key: string) {
    return supabase.storage.getBucket(key);
  }

  function uploadPhoto(bucketId: string, photoFile: File) {
    return supabase.storage.from(bucketId).upload(photoFile.name, photoFile, {
      upsert: false,
      cacheControl: "3600",
    });
  }

  function fetchPublicUrl(bucketId: string, photoKey: string) {
    return supabase.storage.from(bucketId).getPublicUrl(photoKey);
  }

  function createPhoto(data: {
    title: string;
    description: string;
    album_id: string;
    user_id: string;
    path: string;
  }) {
    return supabase.from<Photo>("photos").insert([data]);
  }

  return { fetchBucket, uploadPhoto, fetchPublicUrl, createPhoto };
};

export default useSupabaseStorage;
