import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { SupabaseClient } from "@supabase/supabase-js";

import Header from "../components/features/Header";
import AlbumPhotosList from "../components/features/Album/AlbumPhotosList";
import { Photo } from "../types/resources";
import {
  AlbumAction as Action,
  AlbumActionType as ActionType,
} from "../types/actions";
import LoadingIcon from "../components/icons/LoadingIcon";

interface State {
  loading: boolean;
  error: string | null;
  albumName: string;
  photos: Photo[];
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ERROR:
      return { ...state, error: action.payload };
    case ActionType.FETCH_ALBUM:
      return { ...state, error: null, albumName: action.payload };
    case ActionType.FETCH_ALBUM_PHOTOS:
      return { ...state, error: null, photos: action.payload };
    case ActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

interface Props {
  supabase: SupabaseClient;
}

export default function Album({ supabase, ...rest }: Props): JSX.Element {
  const initialState: State = {
    loading: false,
    error: null,
    albumName: "",
    photos: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();

  // fetch all the photos associated with the album
  useEffect(() => {
    const fetchAlbum = async (): Promise<string> => {
      const { data, error } = await supabase
        .from("albums")
        .select("id, name, created_at")
        .eq("id", id);
      if (error) throw error;
      return data[0].name;
    };

    const fetchPhotos = async () => {
      if (!id) throw new Error("Can not find Album");
      const { data, error } = await supabase
        .from<Photo>("photos")
        .select("id, path, title, description, album_id")
        .eq("album_id", id);
      if (error) throw error;
      return data;
    };

    Promise.all([fetchAlbum, fetchPhotos]).then(async (values) => {
      dispatch({ type: ActionType.SET_LOADING, payload: true });
      dispatch({ type: ActionType.FETCH_ALBUM, payload: await values[0]() });
      dispatch({
        type: ActionType.FETCH_ALBUM_PHOTOS,
        payload: await values[1](),
      });

      dispatch({ type: ActionType.SET_LOADING, payload: false });
    });
  }, [supabase, id]);

  return (
    <>
      <Header title={state.albumName} canGoBack />
      {state.loading && (
        <div className='flex justify-center items-center mt-12'>
          <LoadingIcon size='large' />
        </div>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-2 mx-2 mt-2'>
        <AlbumPhotosList photos={state.photos} />
      </div>
    </>
  );
}
