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
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signUp: (object: any) => Promise<void>;
  signin: (
    email: string,
    password: string
  ) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider | undefined;
    url?: string | null | undefined;
    error: ApiError | null;
  }>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface Profile {
  id: string;
  name: string;
  family_id: string;
  isadmin: boolean;
  updated_at: Date;
}

interface Family {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const { supabase } = useSupabase();

  const signOut = (): void => {
    supabase.auth.signOut();
  };

  const signin = (email: string, password: string) => {
    return supabase.auth.signIn({ email, password });
  };

  const signUpUser = async (email: string, password: string) => {
    const response = await supabase.auth.signUp({ email, password });
    return response;
  };

  const createFamily = async (name: string) => {
    return await supabase.from<Family>("families").insert([
      {
        name,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      },
    ]);
  };

  const createProfile = async (
    userId: string,
    familyId: string,
    name: string
  ) => {
    return await supabase.from<Profile>("profiles").insert([
      {
        id: userId,
        name,
        family_id: familyId,
        isadmin: true,
        updated_at: new Date(Date.now()),
      },
    ]);
  };

  const signUp = async ({ email, password, familyName, name }: any) => {
    const [userResponse, familyResponse] = await Promise.all([
      signUpUser(email, password),
      createFamily(familyName),
    ]);

    if (userResponse.error || familyResponse.error) {
      throw userResponse.error ?? familyResponse.error;
    }

    if (!userResponse.user) {
      throw new Error("User could not be created!  Please try again later");
    }

    const profileResponse = await createProfile(
      userResponse.user.id,
      familyResponse.data[0].id,
      name
    );
    if (profileResponse.error) {
      throw profileResponse.error;
    }
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.unsubscribe();
  }, [supabase.auth, user]);

  const value = { user, signOut, signin, signUp, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
