import { Dispatch } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";

import Button from "../../core/Button";
import LoadingIcon from "../../icons/LoadingIcon";
import { AddCommentFormState } from "../../../types/forms";
import { Comment } from "../../../types/resources";
import { PhotoAction, PhotoActionTypes } from "../../../types/actions";

interface CommentFormProps {
  supabase: SupabaseClient;
  user: User | null;
  dispatch: Dispatch<PhotoAction>;
}

const CommentForm = ({
  supabase,
  user,
  dispatch,
}: CommentFormProps): JSX.Element => {
  const { id } = useParams();
  const defaultValues: AddCommentFormState = { content: "" };
  const methods = useForm<FieldValues>({ defaultValues, mode: "onChange" });

  async function onSubmit(formData: FieldValues) {
    try {
      const { data: addCommentData, error: addCommentError } = await supabase
        .from<Comment>("comments")
        .insert([
          {
            content: formData.comment,
            user_id: user?.id,
            photo_id: id,
          },
        ]);
      if (addCommentError) throw addCommentError;
      const { data: commentData, error: commentError } = await supabase
        .from<Comment>("comments")
        .select("id, content, created_at, user:user_id(id, name)")
        .eq("id", addCommentData[0].id);
      if (commentError) throw commentError;
      dispatch({ type: PhotoActionTypes.ADD_COMMENT, payload: commentData[0] });
      methods.reset();
    } catch (err) {
      console.trace(err);
    }
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div className='mx-3 my-2 relative'>
        <label htmlFor='comment' />
        <textarea
          {...methods.register("comment", {
            required: { value: true, message: "is required" },
          })}
          className='rounded shadow w-full p-2 resize-none leading-6 outline-none'
          autoComplete='on'
          placeholder='Add Comment...'
          cols={10}
          rows={4}></textarea>

        <div className='absolute bottom-1 right-1 text-center'>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            size='medium'
            classes='w-32 px-1 py-0.5'
            disabled={!methods.formState.isDirty || !methods.formState.isValid}>
            {methods.formState.isSubmitting ? (
              <LoadingIcon color='white' size='small' />
            ) : (
              "Add Comment"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
