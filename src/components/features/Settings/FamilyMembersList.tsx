import { Fragment, Dispatch, SetStateAction } from "react";

import { Profile } from "../../../types/resources";
import FamilyMembersListItem from "./FamilyMembersListItem";

interface Props {
  profiles: Profile[];
  setProfiles: Dispatch<SetStateAction<Profile[]>>;
}

export default function FamilyMembersList({
  profiles,
  setProfiles,
}: Props): JSX.Element {
  return (
    <Fragment>
      <section className='my-4 px-2 sm:px-6'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl sm:text-lg'>Family Members</h3>
          <span className='text-center'>Admin Status</span>
        </div>
        <ul className='pl-4 mt-2'>
          {profiles.map((profile) => {
            return (
              <FamilyMembersListItem
                key={profile.id}
                profiles={profiles}
                {...profile}
                setProfiles={setProfiles}
              />
            );
          })}
        </ul>
      </section>
      <hr />
    </Fragment>
  );
}
