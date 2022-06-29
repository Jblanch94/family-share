import { Fragment } from "react";

import CommentsListItem from "./CommentsListItem";
import { Comment } from "../../../types/resources";

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList = ({ comments }: CommentsListProps): JSX.Element => {
  return (
    <Fragment>
      {!comments.length ? (
        <div>No comments</div>
      ) : (
        <ul className='divide-y p-1'>
          {comments.map((comment) => (
            <CommentsListItem key={comment.id} {...comment} />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default CommentsList;
