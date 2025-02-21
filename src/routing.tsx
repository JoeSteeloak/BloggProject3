import { createBrowserRouter } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/admin",
                element: <AdminPage />
            },
            {
                path: "/Login",
                element: <LoginPage />
            }
        ]
    }
])

export default router;