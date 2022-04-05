import { Routes as RouterRoutes, Route } from "react-router-dom";
import Albums from "../pages/Albums";
import Album from "../pages/Album";
import Favorites from "../pages/Favorites";
import Photo from "../pages/Photo";
import AddPhoto from "../pages/AddPhoto";
import Settings from "../pages/Settings";

const Routes = (): JSX.Element => {
  return (
    <RouterRoutes>
      <Route path='/' element={<Albums />} />
      <Route path='/albums/:id' element={<Album />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/photos/:id' element={<Photo />} />
      <Route path='/photos/add' element={<AddPhoto />} />
      <Route path='/settings' element={<Settings />} />
    </RouterRoutes>
  );
};

export default Routes;
