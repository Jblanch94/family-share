import { AlbumsActionTypes as ActionTypes, AlbumActionType } from "./types";
import { Album, Profile, Photo } from "../resources";

export type AlbumsAction =
  | { type: ActionTypes.FETCH_PROFILE; payload: Profile }
  | { type: ActionTypes.FETCH_ALBUMS; payload: Album[] }
  | { type: ActionTypes.ERROR; payload: string }
  | { type: ActionTypes.SET_LOADING; payload: boolean };

export type AlbumAction =
  | { type: AlbumActionType.ERROR; payload: string }
  | { type: AlbumActionType.SET_LOADING; payload: boolean }
  | { type: AlbumActionType.FETCH_ALBUM; payload: string }
  | { type: AlbumActionType.FETCH_ALBUM_PHOTOS; payload: Photo[] };
