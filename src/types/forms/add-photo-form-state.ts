import { Album } from "../resources";

export interface AddPhotoFormState {
  title: string;
  photo: File[];
  description: string;
  album: Album;
}
