import { useEffect, useReducer } from "react";

import AlbumsListItem from "./AlbumsListItem";
import LoadingIcon from "../../icons/LoadingIcon";
import { useSupabase } from "../../../contexts/SupabaseContext";
import { useAuth } from "../../../contexts/AuthContext";
import { Album } from "../../../types/resources";

interface Profile {
  family_id: string;
}

enum ActionTypes {
  ERROR = "ERROR",
  FETCH_PROFILE = "FETCH_PROFILE",
  FETCH_ALBUMS = "FETCH_ALBUMS",
  SET_LOADING = "SET_LOADING",
}

type State = {
  loading: boolean;
  error?: string;
  albums: Album[];
  profile: Profile | null;
};

type Action =
  | { type: ActionTypes.FETCH_PROFILE; payload: Profile }
  | { type: ActionTypes.FETCH_ALBUMS; payload: Album[] }
  | { type: ActionTypes.ERROR; payload: string }
  | { type: ActionTypes.SET_LOADING; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.FETCH_PROFILE:
      return { ...state, profile: action.payload };
    case ActionTypes.FETCH_ALBUMS:
      return { ...state, albums: action.payload };
    case ActionTypes.ERROR:
      return { ...state, albums: [], profile: null, error: action.payload };
    default:
      return state;
  }
}

const AlbumsList = () => {
  const initialState = {
    loading: false,
    error: undefined,
    profile: null,
    albums: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { supabase } = useSupabase();
  const { user } = useAuth();

  // fetch the profile of the currently logged in user
  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      if (user === null) throw new Error("User is not logged in!");
      const { data, error } = await supabase
        .from("profiles")
        .select(`id, name, family_id`)
        .eq("id", user.id);
      if (error) throw error;
      dispatch({ type: ActionTypes.FETCH_PROFILE, payload: data[0] });
    };

    fetchProfile();
  }, [supabase, user]);

  // fetch all albums associated with the family of the logged in user
  useEffect(() => {
    const fetchAlbums = async () => {
      const { data, error } = await supabase
        .from<Album>("albums")
        .select(`id, name, created_at`)
        .eq(
          "family_id",
          state.profile && state.profile.family_id
            ? state.profile.family_id
            : ""
        );
      if (error) throw error;
      dispatch({ type: ActionTypes.FETCH_ALBUMS, payload: data });
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    };

    fetchAlbums();
  }, [supabase, state.profile]);

  return (
    <>
      {state.loading && (
        <div className='flex justify-center items-center mt-12'>
          <LoadingIcon size='large' />
        </div>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-2 mx-2'>
        {!state.loading &&
          state.albums?.map((album) => {
            return (
              <AlbumsListItem key={album.id} name={album.name} numPhotos={5} />
            );
          })}
      </div>
    </>
  );
};

export default AlbumsList;
