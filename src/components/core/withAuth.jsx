import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useSupabase } from "../../contexts/SupabaseContext";

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = () => {
    const LOGIN_URL = "/auth/login";
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const { supabase } = useSupabase();

    useEffect(() => {
      if (!auth.user) {
        navigate(LOGIN_URL, { state: { from: location }, replace: true });
      }
    }, [auth.user, location, navigate]);

    return <WrappedComponent {...auth} supabase={supabase} />;
  };

  return <ComponentWithAuth />;
};

export default withAuth;
