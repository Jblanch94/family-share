import { useRef, useCallback, lazy } from "react";
import { Routes as RouterRoutes, Route, Outlet } from "react-router-dom";

import withAuth from "../components/core/withAuth";
import { useAuth } from "../contexts/AuthContext";

const Albums = lazy(() => import("../pages/Albums"));
const Album = lazy(() => import("../pages/Album"));
const Favorites = lazy(() => import("../pages/Favorites"));
const Photo = lazy(() => import("../pages/Photo"));
const AddPhoto = lazy(() => import("../pages/AddPhoto"));
const Settings = lazy(() => import("../pages/Settings"));
const InviteUser = lazy(() => import("../pages/InviteUser"));
const Layout = lazy(() => import("../layout/Layout"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Login = lazy(() => import("../pages/Login"));
const AddAlbum = lazy(() => import("../pages/AddAlbum"));
const SignUpPostInvite = lazy(() => import("../pages/SignUpPostInvite"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Landing = lazy(() => import("../pages/Landing"));

const Routes = (): JSX.Element => {
  const { user } = useAuth();
  const featuresRef = useRef<HTMLDivElement | null>(null);

  const scrollToFeatures = useCallback(() => {
    if (featuresRef) {
      featuresRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <RouterRoutes>
      <Route
        element={
          <Layout scrollToFeatures={scrollToFeatures}>
            <Outlet />
          </Layout>
        }>
        <Route
          path='/'
          element={user ? withAuth(Albums) : <Landing ref={featuresRef} />}
        />
        <Route path='/albums/:id' element={withAuth(Album)} />
        <Route path='/albums/add' element={withAuth(AddAlbum)} />
        <Route path='/favorites' element={withAuth(Favorites)} />
        <Route path='/photos/:id' element={withAuth(Photo)} />
        <Route path='/photos/add' element={withAuth(AddPhoto)} />
        <Route path='/settings' element={withAuth(Settings)} />
        <Route path='/settings/invite' element={withAuth(InviteUser)} />
        <Route path='/settings/invite/sign-up' element={<SignUpPostInvite />} />
        <Route path='/auth'>
          <Route path='sign-up' element={<SignUp />} />
          <Route path='login' element={<Login />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
        </Route>
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
