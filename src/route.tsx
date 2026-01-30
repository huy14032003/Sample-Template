import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthPage from "@pages/auth/AuthPage";
import { AUTHENTICATION, DASHBOARD, FEEMANAGEMENT, HOME } from "@constants/route.constant";
import AuthLayout from "@components/layouts/auth-layout/AuthLayout";
import NotFound from "@components/Error/NotFound";
import HomePage from "@pages/home/HomePage";
import DashboardPage from "@pages/dashboard/DashboardPage";
import AppLayout from "@/components/layouts/app-layout/AppLayout";
import FeePolicy from "@/pages/fee-management/fee-policy/FeePolicy";
import { rootRedirect, forbiddenRoute, notFoundRoute } from "./routes/errorRoutes";
import Page from "@/pages/home/Page";

const authentication = {
  path: AUTHENTICATION,
  element: createElement(AuthLayout),
  errorElement: createElement(NotFound),
  children: [
    {
      path: AUTHENTICATION + "/login",
      element: createElement(AuthPage),
    },
  ],
};

const home = {
  path: HOME,
  element: createElement(AppLayout),
  errorElement: createElement(NotFound),
  children: [
    {
      path: HOME+'/page_1',
      index: true,
      element: createElement(HomePage),
    },
    {
      path: HOME + "/page_2",
      index: true,
      element: createElement(Page),
    },
    {
      path: HOME + "/page_2/:id",
      index: true,
      element: createElement(Page),
    },
  ],
};

const dashboard = {
  path: DASHBOARD,
  element: createElement(AppLayout),
  errorElement: createElement(NotFound),
  children: [
    {
      index: true,
      element: createElement(DashboardPage),
    },
  ],
};
const feeManagement = {
  path: FEEMANAGEMENT,
  element: createElement(AppLayout),
  errorElement: createElement(NotFound),
  children: [
    {
      index: true,
      element: createElement(FeePolicy),
    },
  ],
};

export const AppRoutes = createBrowserRouter([
  rootRedirect,
  authentication,
  home,
  dashboard,
  feeManagement,
  forbiddenRoute,
  notFoundRoute, // Must be last
]);
