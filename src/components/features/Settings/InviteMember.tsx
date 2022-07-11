import { Fragment } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";

import Button from "../../core/Button";

export default function InviteMember(): JSX.Element {
  return (
    <Fragment>
      <section className='my-4 sm:px-6 px-2 '>
        <h2 className='mb-2 text-xl sm:text-lg'>Invite Family Member</h2>
        <Link to='/settings/invite'>
          <Button
            variant='contained'
            color='primary'
            size='small'
            classes='flex pl-1 text-lg'>
            <PlusIcon className='h-6 w-6' />
            Invite
          </Button>
        </Link>
      </section>
      <hr />
    </Fragment>
  );
}
