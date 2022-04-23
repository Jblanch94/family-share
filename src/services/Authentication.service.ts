import { SupabaseClient } from "@supabase/supabase-js";

export class AuthenticationService {
  constructor(public supabase: SupabaseClient) {}
  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }
}
