import { Suspense } from "react";

import PageCenteredLoadingIcon from "./components/core/PageCenteredLoadingIcon";
import Routes from "./routes";

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<PageCenteredLoadingIcon />}>
        <Routes />
      </Suspense>
    </div>
  );
}

export default App;
