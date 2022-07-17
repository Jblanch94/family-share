import { useRef, useCallback } from "react";
import { Routes as RouterRoutes, Route, Outlet } from "react-router-dom";

import Albums from "../pages/Albums";
import Album from "../pages/Album";
import Favorites from "../pages/Favorites";
import Photo from "../pages/Photo";
import AddPhoto from "../pages/AddPhoto";
import Settings from "../pages/Settings";
import InviteUser from "../pages/InviteUser";
import Layout from "../layout/Layout";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import AddAlbum from "../pages/AddAlbum";
import withAuth from "../components/core/withAuth";
import { useAuth } from "../contexts/AuthContext";
import SignUpPostInvite from "../pages/SignUpPostInvite";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Landing from "../pages/Landing";

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
