import { User } from "@supabase/supabase-js";

export interface SignUpRequestBody {
  email: string;
  password: string;
}

export interface SignUpResponseBody {
  user: User | null;
}
