import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Dev } from "pages/dev";
import { ErrorComponent } from "pages/error";
import { Mint } from "pages/mint";
import { RqProvider } from "shared/providers/rq";
import { WagmiProvider } from "shared/providers/wagmi";
import { setupDecimal } from "shared/utils";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";

setupDecimal();

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
  return (
    <WagmiProvider>
      <RqProvider>
        <RouterProvider future={{ v7_startTransition: true }} router={router} />
        <ToastContainer theme="dark" position="bottom-right" />
      </RqProvider>
    </WagmiProvider>
  );
};
