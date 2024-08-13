import { Suspense } from "react";
import Routers from "routers";

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routers />
    </Suspense>
  );
};

export default App;
