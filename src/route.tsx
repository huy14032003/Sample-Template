import { createElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from '@pages/auth/AuthPage'
import { AUTHENTICATION } from "@constants/route.constant";
import AuthLayout from "@components/layouts/auth-layout/AuthLayout";
import NotFound from "@components/Error/NotFound";

const authentication = {
    path: AUTHENTICATION,
    element: createElement(AuthLayout),
    errorElement: createElement(NotFound),
    children: [
        {
            path: AUTHENTICATION + '/login',
            element: createElement(AuthPage)
        }
    ]
}

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: createElement(Navigate, { to: AUTHENTICATION + '/login', replace: true })
    },
    authentication,
])