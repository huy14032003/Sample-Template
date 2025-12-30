import { createElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from '@pages/auth/AuthPage'
import { AUTHENTICATION } from "@constants/route.constant";
import AuthLayout from "@components/layouts/auth-layout/AuthLayout";
import NotFound from "@components/Error/NotFound";
import HomePage from "@pages/home/HomePage";
import DashboardPage from "@pages/dashboard/DashboardPage";

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

const home = {
    path: '/home',
    errorElement: createElement(NotFound),
    children: [
        {
            index: true,
            element: createElement(HomePage)
        },

    ]
}

const dashboard = {
    path: '/dashboard',
    errorElement: createElement(NotFound),
    children: [
        {
            index: true,
            element: createElement(DashboardPage)
        },

    ]
}

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: createElement(Navigate, { to: '/home', replace: true })
    },
    authentication,
    home,
    dashboard,
])