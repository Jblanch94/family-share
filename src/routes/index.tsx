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

const Routes = (): JSX.Element => {
  return (
    <RouterRoutes>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }>
        <Route path='/' element={<Albums />} />
        <Route path='/albums/:id' element={<Album />} />
        <Route path='/albums/add' element={<AddAlbum />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/photos/:id' element={<Photo />} />
        <Route path='/photos/add' element={<AddPhoto />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/auth'>
          <Route path='sign-up' element={<SignUp />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
