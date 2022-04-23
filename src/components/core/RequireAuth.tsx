import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!auth.user) {
    navigate("/auth/login", { state: { from: location }, replace: true });
  }

  return children;
};

export default RequireAuth;
