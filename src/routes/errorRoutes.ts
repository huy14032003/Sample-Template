/**
 * Error Routes Configuration
 * Separates redirect and error handling logic from main routes
 */

import { createElement } from "react";
import { Navigate } from "react-router-dom";
import NotFound from "@components/Error/NotFound";
import Forbidden from "@components/Error/Forbidden";
import { HOME } from "@/constants/route.constant";

export const rootRedirect = {
    path: "/",
    element: createElement(Navigate, { to: HOME+'/page_1', replace: true }),
};

export const forbiddenRoute = {
    path: "/403",
    element: createElement(Forbidden),
};

export const notFoundRoute = {
    path: "*",
    element: createElement(NotFound),
};

export const errorRoutes = [rootRedirect, forbiddenRoute, notFoundRoute];
