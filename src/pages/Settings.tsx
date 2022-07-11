import { Fragment, useEffect, useState, useCallback } from "react";
import { User, SupabaseClient } from "@supabase/supabase-js";

import Header from "../components/features/Header";
import InviteMember from "../components/features/Settings/InviteMember";
import FamilyMembersList from "../components/features/Settings/FamilyMembersList";
import Signout from "../components/features/Settings/Signout";
import DeleteAccount from "../components/features/Settings/DeleteAccount";
import LoginSettings from "../components/features/Settings/LoginSettings";
import useProfile from "../hooks/useProfile";
import { Profile } from "../types/resources";
import PageCenteredLoadingIcon from "../components/core/PageCenteredLoadingIcon";

interface Props {
  user: User;
  supabase: SupabaseClient;
  signOut: () => Promise<void>;
}

const Settings = ({ user, supabase, signOut }: Props): JSX.Element => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const currentProfile = useProfile(user?.id, supabase);

  const handleClick = useCallback(async () => {
    await signOut();
  }, [signOut]);

  useEffect(() => {
    const fetchFamilyUsers = async () => {
      if (!user) return;
      try {
        setLoading(true);

        const profileResponse = await supabase
          .from("profiles")
          .select("id, updated_at, name, isadmin, family_id")
          .eq("family_id", currentProfile?.family_id);
        if (profileResponse.error) throw profileResponse.error;
        setProfiles(profileResponse.data);
      } catch (err) {
        console.trace(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyUsers();
  }, [supabase, user?.id, user, currentProfile?.family_id]);

  return (
    <>
      {loading ? (
        <PageCenteredLoadingIcon />
      ) : (
        <Fragment>
          <Header title='Settings' />
          <InviteMember />
          {currentProfile?.isadmin && (
            <FamilyMembersList profiles={profiles} setProfiles={setProfiles} />
          )}
          <LoginSettings
            email={user?.email}
            supabase={supabase}
            user_id={user?.id}
          />
          <div className='mb-4 mt-8 sm:px-6 px-2 flex flex-col md:flex-row md:justify-between space-y-2'>
            <Signout handleClick={handleClick} />

            {/* TODO:  NEED TO IMPLEMENT FUNCTIONALTIY TO DELETE ACCOUNT */}
            <DeleteAccount />
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Settings;
