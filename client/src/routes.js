import Admin from './pages/privatePages/Admin/Admin'
import Main from "./pages/Main";
import About from "./pages/publicPages/About/About";
import Support from "./pages/publicPages/Support/Support";
import ForgotPassword from "./pages/publicPages/ForgotPassword";
import ResetPassword from "./pages/publicPages/ResetPassword";
import {
    ABOUT_ROUTE,
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SUPPORT_ROUTE,
    VET_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/> // Используем element с JSX
    }
];

export const publicRoutes = [
    {
        path: VET_ROUTE,
        element: <Main/> // Используем element с JSX
    },
    {
        path: SUPPORT_ROUTE,
        element: <Support/> // Используем element с JSX
    },
    {
        path: ABOUT_ROUTE,
        element: <About/> // Используем element с JSX
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth/> // Используем element с JSX
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Auth/> // Используем element с JSX
    },
    {
        path: FORGOT_PASSWORD_ROUTE,
        element: <ForgotPassword/> // Используем element с JSX
    },
    {
        path: `${RESET_PASSWORD_ROUTE}/:token`,
        element: <ResetPassword/>
    }

];
