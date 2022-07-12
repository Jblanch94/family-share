import { useReducer, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SupabaseClient, User } from "@supabase/supabase-js";

import Fab from "../components/core/Fab";
import Header from "../components/features/Header";
import SearchAlbumsForm from "../components/features/SearchAlbumsForm";
import AlbumsList from "../components/features/Albums/AlbumsList";
import { Album } from "../types/resources";
import {
  AlbumsActionTypes as ActionTypes,
  AlbumsAction as Action,
} from "../types/actions";
import { SearchAlbumsFormState } from "../types/forms";
import useProfile from "../hooks/useProfile";

type State = {
  loading: boolean;
  error?: string;
  albums: Album[];
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.FETCH_ALBUMS:
      return { ...state, albums: action.payload };
    case ActionTypes.ERROR:
      return { ...state, albums: [], error: action.payload };
    default:
      return state;
  }
}

interface Props {
  supabase: SupabaseClient;
  user: User;
}

export default function Albums({ supabase, user }: Props): JSX.Element {
  const initialState = {
    loading: false,
    error: undefined,
    albums: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const profile = useProfile(user?.id, supabase);
  const methods = useForm<SearchAlbumsFormState>({
    defaultValues: { name: "" },
  });

  const onSubmit = async (formData: SearchAlbumsFormState) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const { data, error } = await supabase
        .rpc("search_albums", {
          album_term: formData.name,
        })
        .eq("family_id", profile?.family_id ?? undefined);
      if (error) throw error;
      dispatch({ type: ActionTypes.FETCH_ALBUMS, payload: data });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  // fetch all albums associated with the family of the logged in user
  useEffect(() => {
    const fetchAlbums = async () => {
      if (!profile) throw new Error("Could not fetch User Profile");
      const { data, error } = await supabase
        .from<Album>("albums")
        .select(`id, name, created_at, photos(id, title, created_at)`)
        .eq("family_id", profile.family_id);
      if (error) throw error;
      dispatch({ type: ActionTypes.FETCH_ALBUMS, payload: data });
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    };

    if (profile) fetchAlbums();
  }, [supabase, profile, dispatch]);

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
}
