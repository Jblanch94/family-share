import { useEffect, useState } from "react";

import { Profile } from "../../../types/resources";
import { calculateRelativeTimeDifference } from "../../../utils/date-utils";

interface CommentsListItemProps {
  content: string;
  created_at: Date;
  user: Profile;
}

const CommentsListItem = ({
  content,
  created_at,
  user,
}: CommentsListItemProps): JSX.Element => {
  const [commentDate, setCommentDate] = useState(created_at.toString());

  useEffect(() => {
    setCommentDate(
      calculateRelativeTimeDifference(new Date(created_at).valueOf(), "en-US")
    );
  }, [created_at]);
  return (
    <li className='py-2 pl-2'>
      <div className='flex items-center justify-between pb-4'>
        <h4 className='inline-block font-semibold'>{user.name}</h4>
        <div className='font-normal text-md capitalize text-commentDateGray mr-2'>
          {commentDate}
        </div>
      </div>
      <p className='font-medium text-lg break-words whitespace-normal text-commentGray'>
        {content}
      </p>
    </li>
  );
};

export default CommentsListItem;
