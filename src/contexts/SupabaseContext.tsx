import { createContext, ReactNode, useContext } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

import { supabase } from "../config/supabaseClient";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  supabase: SupabaseClient;
}

const SupabaseContext = createContext<AppContextProps>({ supabase });

function SupabaseProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
}

function useSupabase() {
  return useContext(SupabaseContext);
}

export { SupabaseProvider, useSupabase };
