import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "@/route";
import { Provider } from "react-redux";
import { store } from "@/stores/store";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import ScreenLoading from "@/components/loading/ScreenLoading";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={AppRoutes} />
      <Toaster />
      <ScreenLoading />
    </Provider>
  </StrictMode>
);

