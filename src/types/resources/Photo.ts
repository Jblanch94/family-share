export interface Photo {
  id: string;
  path: string;
  title: string;
  description: string;
  user_id: string;
  album_id: string;
  created_at?: Date;
  updated_at?: Date;
}
