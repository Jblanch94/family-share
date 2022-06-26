import {
  AlbumsActionTypes as ActionTypes,
  AlbumActionType,
  PhotoActionTypes,
} from "./types";
import { Album, Profile, Photo, Comment } from "../resources";

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

export type PhotoAction =
  | { type: PhotoActionTypes.ERROR; payload: string }
  | { type: PhotoActionTypes.SET_LOADING; payload: boolean }
  | { type: PhotoActionTypes.FETCH_COMMENTS; payload: Comment[] }
  | { type: PhotoActionTypes.ADD_COMMENT; payload: Comment }
  | { type: PhotoActionTypes.FETCH_PHOTO; payload: Photo }
  | { type: PhotoActionTypes.UPDATE_PHOTO; payload: Photo }
  | { type: PhotoActionTypes.FETCH_FAVORITE_STATUS; payload: boolean }
  | { type: PhotoActionTypes.UPDATE_FAVORITE_STATUS; payload: boolean };
