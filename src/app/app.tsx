import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Dev } from "pages/dev";
import { ErrorComponent } from "pages/error";
import { Mint } from "pages/mint";

import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorComponent />}>
      <Route path="/" element={<Mint />} />

      {import.meta.env.DEV && <Route path="/dev" element={<Dev />} />}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

export const App = () => {
  return <RouterProvider router={router} />;
};
