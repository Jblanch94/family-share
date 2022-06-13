import { useReducer, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Fab from "../components/core/Fab";
import Header from "../components/features/Header";
import SearchAlbumsForm from "../components/features/SearchAlbumsForm";
import AlbumsList from "../components/features/Albums/AlbumsList";
import { Album, Profile } from "../types/resources";
import {
  AlbumsActionTypes as ActionTypes,
  AlbumsAction as Action,
} from "../types/actions";
import { SearchAlbumsFormState } from "../types/forms";
import { useSupabase } from "../contexts/SupabaseContext";
import { useAuth } from "../contexts/AuthContext";

type State = {
  loading: boolean;
  error?: string;
  albums: Album[];
  profile: Profile | null;
};

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

const Albums = (): JSX.Element => {
  const initialState = {
    loading: false,
    error: undefined,
    profile: null,
    albums: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const methods = useForm<SearchAlbumsFormState>({
    defaultValues: { name: "" },
  });
  const { supabase } = useSupabase();
  const { user } = useAuth();

  const onSubmit = async (formData: SearchAlbumsFormState) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const { data, error } = await supabase
        .rpc("search_albums", {
          album_term: formData.name,
        })
        .eq("family_id", state.profile?.family_id ?? undefined);
      if (error) throw error;
      dispatch({ type: ActionTypes.FETCH_ALBUMS, payload: data });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

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
  }, [supabase, user, dispatch]);

  // fetch all albums associated with the family of the logged in user
  useEffect(() => {
    const fetchAlbums = async () => {
      if (state.profile === null) throw new Error("Profile is null");
      const { data, error } = await supabase
        .from<Album>("albums")
        .select(`id, name, created_at`)
        .eq("family_id", state.profile.family_id);
      if (error) throw error;
      dispatch({ type: ActionTypes.FETCH_ALBUMS, payload: data });
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    };

    if (state.profile) fetchAlbums();
  }, [supabase, state.profile, dispatch]);

  return (
    <>
      <Header title='Albums' />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='mx-4 my-2'>
            <SearchAlbumsForm />
          </div>
        </form>
      </FormProvider>

      {/* List to display all of the albums with Album Name, User who created the album and the number of photos in each album as cards in a grid */}
      <AlbumsList {...state} />
      <Link to='/albums/add'>
        <Fab />
      </Link>
    </>
  );
};

export default Albums;
