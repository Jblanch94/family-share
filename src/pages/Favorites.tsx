import { useEffect, useReducer } from "react";
import { SupabaseClient, User } from "@supabase/supabase-js";

import {
  FavoritesActionType as ActionType,
  FavoritesAction as Action,
} from "../types/actions";
import { Favorite, Photo } from "../types/resources";
import Header from "../components/features/Header";
import FavoritesList from "../components/features/Favorites/FavoritesList";

interface Props {
  user: User;
  supabase: SupabaseClient;
}

interface State {
  isLoading: boolean;
  photos: Photo[];
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.FETCH_PHOTOS:
      return { ...state, photos: action.payload };
    case ActionType.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionType.REMOVE_FAVORITE:
      return {
        ...state,
        photos: state.photos.filter(
          (photo) =>
            photo.id !== action.payload.photo_id &&
            photo.user_id !== action.payload.user_id
        ),
      };
    default:
      return state;
  }
}

export default function Favorites({ user, supabase }: Props): JSX.Element {
  const initialState: State = { isLoading: false, photos: [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchPhoto = async (id: string) => {
      return await supabase
        .from<Photo>("photos")
        .select("id, title, description, path, created_at")
        .eq("id", id);
    };

    const fetchUserFavoritedPhotos = async () => {
      try {
        dispatch({ type: ActionType.SET_LOADING, payload: true });
        const { data, error } = await supabase
          .from<Favorite>("favorites")
          .select("photo_id")
          .eq("user_id", user?.id);
        if (error) throw error;

        const photos = await Promise.all(
          data.map(async (favorite) => {
            const photoResponse = await fetchPhoto(favorite.photo_id);
            if (photoResponse.error) throw photoResponse.error;
            return photoResponse.data[0];
          })
        );

        dispatch({
          type: ActionType.FETCH_PHOTOS,
          payload: photos,
        });
      } catch (err) {
        console.trace(err);
      } finally {
        dispatch({ type: ActionType.SET_LOADING, payload: false });
      }
    };

    fetchUserFavoritedPhotos();
  }, [user?.id, supabase, dispatch]);

  return (
    <>
      <Header title='Favorites' />
      <FavoritesList
        {...state}
        userId={user.id}
        supabase={supabase}
        dispatch={dispatch}
      />
    </>
  );
}
