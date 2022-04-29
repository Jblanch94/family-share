import { Session, User, ApiError } from "@supabase/supabase-js";

export interface SignUpRequestBody {
  email: string;
  password: string;
}

export type SignUpResponseBody = {
  user: User | null;
  session: Session | null;
  error: ApiError | null;
};
