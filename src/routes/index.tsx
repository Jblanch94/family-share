import { Routes as RouterRoutes, Route, Outlet } from "react-router-dom";
import Albums from "../pages/Albums";
import Album from "../pages/Album";
import Favorites from "../pages/Favorites";
import Photo from "../pages/Photo";
import AddPhoto from "../pages/AddPhoto";
import Settings from "../pages/Settings";
import Layout from "../layout/Layout";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import AddAlbum from "../pages/AddAlbum";
import withAuth from "../components/core/withAuth";
import { useAuth } from "../contexts/AuthContext";

const Routes = (): JSX.Element => {
  const { user } = useAuth();
  return (
    <RouterRoutes>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }>
        <Route path='/' element={user ? <Albums /> : <div>Landing Page</div>} />
        <Route path='/albums/:id' element={withAuth(Album)} />
        <Route path='/albums/add' element={withAuth(AddAlbum)} />
        <Route path='/favorites' element={withAuth(Favorites)} />
        <Route path='/photos/:id' element={withAuth(Photo)} />
        <Route path='/photos/add' element={withAuth(AddPhoto)} />
        <Route path='/settings' element={withAuth(Settings)} />
        <Route path='/auth'>
          <Route path='sign-up' element={<SignUp />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
