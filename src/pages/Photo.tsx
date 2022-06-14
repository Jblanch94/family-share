import { Fragment } from "react";

import Header from "../components/features/Header";

const Photo = (): JSX.Element => {
  return (
    <Fragment>
      <Header title='Photo Title' canGoBack />
    </Fragment>
  );
};

export default Photo;
