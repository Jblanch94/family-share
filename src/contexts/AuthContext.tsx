import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { User, Session, ApiError, Provider } from "@supabase/supabase-js";

import { useSupabase } from "./SupabaseContext";

interface AuthContextType {
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const { supabase } = useSupabase();

  const signOut = (): void => {
    supabase.auth.signOut();
  };

  const signin = (
    data: any
  ): Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider | undefined;
    url?: string | null | undefined;
    error: ApiError | null;
  }> => {
    return supabase.auth.signIn(data);
  };

  const signUp = ({ email, password }: { email: string; password: string }) => {
    return supabase.auth.signUp({ email, password });
  };

  //TODO: NEED TO ALSO LISTEN FOR AN AUTH STATE CHANGED TO UPDATE
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.unsubscribe();
  }, [supabase.auth, user]);

  const value = { user, signOut, signin, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
