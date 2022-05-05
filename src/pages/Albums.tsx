import { Link } from "react-router-dom";

import Fab from "../components/core/Fab";
import Header from "../components/features/Header";

const Albums = (): JSX.Element => {
  return (
    <>
      <Header title='Albums' />
      <Link to='/albums/add'>
        <Fab />
      </Link>
    </>
  );
};

export default Albums;
