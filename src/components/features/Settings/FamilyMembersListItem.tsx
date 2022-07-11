import { useState, Dispatch, SetStateAction } from "react";
import { Switch } from "@headlessui/react";

import { useSupabase } from "../../../contexts/SupabaseContext";
import { Profile } from "../../../types/resources";

interface Props {
  id: string;
  name: string;
  isadmin: boolean;
  family_id: string;
  setProfiles: Dispatch<SetStateAction<Profile[]>>;
  profiles: Profile[];
}

export default function FamilyMembersListItem({
  id,
  name,
  isadmin,
  family_id,
  setProfiles,
  profiles,
}: Props): JSX.Element {
  const { supabase } = useSupabase();
  const [enabled, setEnabled] = useState(isadmin);

  async function updateAdminStatus() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ isadmin: !enabled })
        .match({ id });
      if (error) throw error;
      setProfiles(
        profiles.map((profile) => {
          if (profile.id === id) {
            return data[0];
          }
          return profile;
        })
      );
      supabase.auth.refreshSession();
    } catch (err) {
      console.trace(err);
    }
  }

  return (
    <div className='flex items-center justify-between'>
      <li className='sm:text-md text-lg leading-6'>{name}</li>
      <div>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          onClick={updateAdminStatus}
          className={`${
            !enabled ? "bg-gray" : "bg-blue-500"
          } relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
          <span className='sr-only'>Use setting</span>
          <span
            aria-hidden='true'
            className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}></span>
        </Switch>
      </div>
    </div>
  );
}
