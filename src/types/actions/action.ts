import { AlbumsActionTypes as ActionTypes } from "./types";
import { Album, Profile } from "../resources";

export type AlbumsAction =
  | { type: ActionTypes.FETCH_PROFILE; payload: Profile }
  | { type: ActionTypes.FETCH_ALBUMS; payload: Album[] }
  | { type: ActionTypes.ERROR; payload: string }
  | { type: ActionTypes.SET_LOADING; payload: boolean };
