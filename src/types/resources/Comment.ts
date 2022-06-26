import { Profile } from "./Profile";

export interface Comment {
  id: string;
  content: string;
  user_id: string | Profile;
  photo_id?: string;
  created_at: Date;
  user: Profile;
}
