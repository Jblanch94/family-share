import { SupabaseClient } from "@supabase/supabase-js";

export class FamilyService {
  constructor(public supabase: SupabaseClient) {}

  create(name: string) {
    return this.supabase
      .from("families")
      .insert([
        {
          name,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
      ]);
  }
}
