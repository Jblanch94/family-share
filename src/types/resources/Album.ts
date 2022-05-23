import { Photo } from "./Photo";

export interface Album {
  id: string;
  name: string;
  created_at: Date;
  family_id: string;
  photos: Photo[];
}
