import { Fragment, useState, useCallback, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useSupabase } from "../contexts/SupabaseContext";
import { Photo as PhotoResource, Comment } from "../types/resources";
import { PhotoActionTypes, PhotoAction } from "../types/actions";
import Image from "../components/features/Photo/Image";
import CommentForm from "../components/features/Photo/CommentForm";
import CommentsList from "../components/features/Photo/CommentsList";
import EditPhotoDialog from "../components/features/Photo/EditPhotoDialog";
import LoadingIcon from "../components/icons/LoadingIcon";
import PhotoHeader from "../components/features/Photo/PhotoHeader";

interface State {
  photo: PhotoResource | null;
  comments: Comment[];
  isFavorited: boolean;
  isLoading: boolean;
}

const initialState: State = {
  photo: null,
  comments: [],
  isLoading: false,
  isFavorited: false,
};

function reducer(state: State, action: PhotoAction): State {
  switch (action.type) {
    case PhotoActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case PhotoActionTypes.FETCH_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
      };
    case PhotoActionTypes.ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    case PhotoActionTypes.FETCH_PHOTO:
      return { ...state, photo: action.payload };
    case PhotoActionTypes.UPDATE_PHOTO:
      return { ...state, photo: action.payload };
    case PhotoActionTypes.FETCH_FAVORITE_STATUS:
      return { ...state, isFavorited: action.payload };
    case PhotoActionTypes.UPDATE_FAVORITE_STATUS:
      return { ...state, isFavorited: action.payload };
    default:
      return state;
  }
}

const Photo = (): JSX.Element => {
  const LIMIT = 10;
  const [isOpen, setIsOpen] = useState(false);

  const [{ photo, comments, isLoading, isFavorited }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const { id } = useParams();

  // concurrent requests to get the photo details, comments for the photo and records for if the photo is favorited by the current user
  const fetchComments = useCallback(
    async (startIndex: number, endIndex: number) => {
      const response = await supabase
        .from<Comment>("comments")
        .select("id, content, created_at, user:user_id (id, name)")
        .eq("photo_id", id)
        .range(startIndex, endIndex)
        .order("created_at", { ascending: true });

      return response;
    },
    [id, supabase]
  );

  useEffect(() => {
    const fetchPhoto = async () => {
      return await supabase
        .from<PhotoResource>("photos")
        .select(`id, title, description, path`)
        .eq("id", id);
    };

    const fetchFavoriteStatus = async () => {
      return await supabase
        .from("favorites")
        .select("user_id, photo_id")
        .eq("user_id", user?.id)
        .eq("photo_id", id);
    };

    const handleConcurrentRequests = async () => {
      try {
        dispatch({ type: PhotoActionTypes.SET_LOADING, payload: true });
        const [
          fetchPhotoResponse,
          fetchCommentsResponse,
          fetchFavoriteStatusResponse,
        ] = await Promise.all([
          fetchPhoto(),
          fetchComments(0, LIMIT - 1),
          fetchFavoriteStatus(),
        ]);
        if (fetchPhotoResponse.error) throw fetchPhotoResponse.error;
        if (fetchCommentsResponse.error) throw fetchCommentsResponse.error;
        if (fetchFavoriteStatusResponse.error)
          throw fetchFavoriteStatusResponse.error;

        dispatch({
          type: PhotoActionTypes.FETCH_PHOTO,
          payload: fetchPhotoResponse.data[0],
        });
        dispatch({
          type: PhotoActionTypes.FETCH_COMMENTS,
          payload: fetchCommentsResponse.data,
        });
        dispatch({
          type: PhotoActionTypes.FETCH_FAVORITE_STATUS,
          payload: fetchFavoriteStatusResponse.data.length === 1,
        });
      } catch (err) {
        console.trace(err);
      } finally {
        dispatch({ type: PhotoActionTypes.SET_LOADING, payload: false });
      }
    };

    handleConcurrentRequests();
  }, [id, user?.id, supabase, fetchComments]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleLoadMoreComments = useCallback(async () => {
    const response = await fetchComments(
      comments.length,
      comments.length + LIMIT - 1
    );
    if (response.error) throw response.error;
    dispatch({
      type: PhotoActionTypes.FETCH_COMMENTS,
      payload: response.data,
    });
  }, [fetchComments, comments.length]);

  const updateFavoriteStatus = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("user_id, photo_id")
        .eq("user_id", user?.id)
        .eq("photo_id", id);
      if (error) throw error;

      if (data.length) {
        // remove the entry from the database
        const { data, error: favoritesDeletedError } = await supabase
          .from("favorites")
          .delete()
          .match({ user_id: user?.id, photo_id: id });
        if (favoritesDeletedError) throw favoritesDeletedError;
        const filteredFavoriteStatus = data.filter(
          (d) => d.user_id !== user?.id && d.photo_id !== id
        );

        return dispatch({
          type: PhotoActionTypes.UPDATE_FAVORITE_STATUS,
          payload: filteredFavoriteStatus.length === 1,
        });
      } else {
        const { data, error } = await supabase
          .from("favorites")
          .insert([{ user_id: user?.id, photo_id: id }]);
        if (error) throw error;
        dispatch({
          type: PhotoActionTypes.UPDATE_FAVORITE_STATUS,
          payload: data.length === 1,
        });
      }
    } catch (err) {
      console.trace(err);
    }
  }, [id, supabase, user?.id]);

  return (
    <Fragment>
      {/* Header */}
      <PhotoHeader
        isLoading={isLoading}
        isFavorited={isFavorited}
        handleOpen={handleOpen}
        updateFavoriteStatus={updateFavoriteStatus}
        title={photo?.title ?? ""}
      />

      {/* Dialog Component */}
      <EditPhotoDialog
        handleClose={handleClose}
        isOpen={isOpen}
        photo={photo}
        dispatch={dispatch}
        supabase={supabase}
      />

      {/* Photo Component */}
      {isLoading ? (
        <div className='flex min-h-screen items-center justify-center'>
          <LoadingIcon size='large' />
        </div>
      ) : (
        <>
          <div className='relative flex px-4 sm:px-2 md:px-2 lg:px-0'>
            <Image
              path={photo?.path ?? ""}
              title={photo?.title ?? ""}
              description={photo?.description ?? ""}
            />
          </div>

          {/* Comment Form Component */}
          <div className='w-full'>
            <CommentForm supabase={supabase} user={user} dispatch={dispatch} />

            {/* List of Comments */}
            <CommentsList comments={comments} />
            <button
              onClick={handleLoadMoreComments}
              className='block mx-auto my-2'>
              Load more comments
            </button>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Photo;
