import { SupabaseClient } from "@supabase/supabase-js";

export class UserService {
  constructor(public supabase: SupabaseClient) {}

  public create(id: string, name: string, familyId: string) {
    return this.supabase.from("profiles").insert([
      {
        id,
        name,
        family_id: familyId,
        isadmin: true,
        updated_at: new Date(Date.now()),
      },
    ]);
  }
}
