import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY as string;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
