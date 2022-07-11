import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { Profile } from "../types/resources";

export default function useProfile(
  userId: string,
  supabase: SupabaseClient
): Profile | null {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from<Profile>("profiles")
        .select("id, name, updated_at, family_id, isadmin")
        .eq("id", userId);
      if (error) throw error;
      setProfile(data[0]);
    }

    fetchProfile();
  }, [supabase, userId]);

  return profile;
}
