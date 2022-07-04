import { Dispatch, MouseEvent, useCallback } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

import { Photo } from "../../../types/resources";
import LoadingIcon from "../../icons/LoadingIcon";
import { ReactComponent as NoResults } from "../../../assets/img/void.svg";
import FavoritesListItem from "./FavoritesListItem";
import {
  FavoritesAction as Action,
  FavoritesActionType as ActionType,
} from "../../../types/actions";

interface Props {
  isLoading: boolean;
  photos: Photo[];
  userId: string;
  supabase: SupabaseClient;
  dispatch: Dispatch<Action>;
}

const FavoritesList = ({
  isLoading,
  photos,
  userId,
  supabase,
  dispatch,
}: Props) => {
  const handleClick = useCallback(
    function (evt: MouseEvent<SVGSVGElement>) {
      // prevent click from clicking the link to the page of the photo
      evt.preventDefault();

      return async function (id: string) {
        try {
          dispatch({ type: ActionType.SET_LOADING, payload: true });
          const { data, error } = await supabase
            .from("favorites")
            .delete()
            .eq("photo_id", id)
            .eq("user_id", userId);
          if (error) throw error;

          dispatch({ type: ActionType.REMOVE_FAVORITE, payload: data[0] });
        } catch (err) {
          console.trace(err);
        } finally {
          dispatch({ type: ActionType.SET_LOADING, payload: false });
        }
      };
    },
    [userId, supabase, dispatch]
  );

  if (photos.length < 1) {
    return (
      <div className='flex flex-col items-center pt-6'>
        <NoResults />
        <p className='text-center pt-6'>No Results Found</p>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <LoadingIcon size='large' color='dark' />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-2 mx-2 mt-2'>
          {photos.map((photo) => (
            <FavoritesListItem
              key={photo.id}
              {...photo}
              handleClick={(e: MouseEvent<SVGSVGElement>) =>
                handleClick(e)(photo.id)
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FavoritesList;
